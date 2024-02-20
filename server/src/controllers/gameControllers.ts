import mongoose from "mongoose";
import trackModel from "../models/trackModel.js";
import { TWaypoint } from "../models/waypointsModel.js";
import GameSession from "../types/IGameSession.js";
import { WebSocket } from "ws";
import scoreboardModel, { TScroboeard } from "../models/scoreboardModel.js";


type TStage = Pick<TWaypoint, "type" | "payload"> 
type TAnswer = {
  score: number,
  timeMs: number,
  wp : TWaypoint
}
const calcPoints = (wp: TWaypoint, answer : {long : number, latt: number}) : number =>{
    return 100;

}
const sendStage = (ws: WebSocket, game:GameSession) => {
    game.stageStart = new Date();
    const wp = game.details?.data.waypoints[game.currentStage];
    const res : TStage = {
        type: wp?.type!,
        payload: wp?.payload!
    }
    ws.send(JSON.stringify(res));
  }
const finishGame = async  (ws: WebSocket, game:GameSession) => {
    if(!game.details)
      throw new Error("Nie znaleziono gry");
    const res = {
      totalScore: game.gameScore.score.reduce((sum, num) => sum + num, 0) / game.gameScore.score.length,
      time: game.gameScore.timeMs.reduce((sum, num)=> sum+num, 0)
    }
    const docToSave = {
      timeMs: res.time,
      score: res.totalScore,
      userId: "placeholder",
      trackId: game.details.id
    }
    const doc = await scoreboardModel.create(docToSave);
    ws.send(JSON.stringify(res));

}
export const handleGameSelection = async (ws: WebSocket, game: GameSession, msg : any)=>{
    const {id} = msg;
    if(!id)
      throw new Error("Nie podałeś id trasy")
    if(game.isStarted)
      throw new Error("Nie możesz wybrać trasy gdy gra jest rozpoczęta");     
    if(!mongoose.Types.ObjectId.isValid(id))
        throw new Error("Id nie jest typu ObjectId")
      let doc = await trackModel.findById(id).populate("waypoints");
    if(!doc)
        throw new Error(`Trasa od id ${id} nie istnieje`);
    if(!doc.isActive)
      throw new Error("Trasa jest nie aktywna")
    
    game.details = {
      id: doc.id,
      data: doc
    }

    ws.send(`Gra o id ${id} została wybrana`);
}

export const handleGameStart = async (ws:WebSocket, game:GameSession)=>{
    if(!game.details)
      throw new Error("Najpierw wybierz grę")    
    game.isStarted  = true;
    sendStage(ws, game);
  } 
export const handleGameAnswer = async (ws: WebSocket, game: GameSession, msg: any)=>{
    if(!game.isStarted)
      throw new Error("Najpierw musisz zacząć grę");
    if(!game.details)
      throw new Error("Najpierw wybierz grę");
    if(
      (game.gameScore.score.length !== game.currentStage) ||
      (game.gameScore.timeMs.length) !== game.currentStage ) 
      throw new Error("Na pytanie odpowiedziano, użyj komendy next");
    const {long, lat} = msg;
    if(!long || !lat)
      throw new Error("Brak danych opisujących punkt na mapie")
    if(!Number.isSafeInteger(long) || !Number.isSafeInteger(lat))
      throw new Error("Dane wejściowe nie są typu number")
    const currentDate = new Date();
        const timeScore = currentDate.getTime() - game.stageStart?.getTime()!;
    const pointScore = (calcPoints(game.details.data.waypoints[game.currentStage], {long:long,latt:lat}));
    game.gameScore.score.push(pointScore);
    game.gameScore.timeMs.push(timeScore);
    const res : TAnswer = {
      score: pointScore,
      timeMs: timeScore,
      wp: game.details.data.waypoints[game.currentStage]

    }
    ws.send(JSON.stringify(res));
  }
  export const handleGameNext = async (ws: WebSocket, game: GameSession)=> {
    if(!game.isStarted || !game.details)
      throw new Error("Najpierw musisz zacząć grę");
    if(!game.details)
      throw new Error("Najpierw wybierz grę");
    if(game.currentStage === game.details.data.waypoints.length -1)
      return finishGame(ws, game);
    if((game.currentStage === game.gameScore.score.length) ||
      (game.currentStage === game.gameScore.timeMs.length)
      )
      throw new Error("Odpowiedz zanim przejdziesz dalej")
    game.currentStage++;
    sendStage(ws, game);
  }
 