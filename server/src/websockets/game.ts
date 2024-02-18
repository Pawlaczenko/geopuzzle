import { Server } from "http";
import {  RawData, WebSocket, WebSocketServer } from "ws";
import * as gameController from "../controllers/gameControllers.js";
import GameSession from "../types/IGameSession.js";
import { ObjectId } from "mongodb";
import { wsError } from "../utils/wsError.js";



  
const gameWebsocket = async (expressServer: Server) => {
    const websocketServer = new WebSocketServer({
      noServer: true,
      path: "/game",

    });
    expressServer.on("upgrade", (request, socket, head) => {
      websocketServer.handleUpgrade(request, socket, head, (websocket) => {
        websocketServer.emit("connection", websocket, request);
      });
    });
    websocketServer.on("error", ()=>websocketServer.close())
    websocketServer.on("connection", async (ws)=>{
      ///
      /// Connecting to game
      ///
        const gameInfo : GameSession = {
          stageStart: null,
          currentStage: 0,
          isStarted: false,
          details: null,
          gameScore: {
            score: [],
            timeMs: []
          }
        }

        ws.on("message", (data)=>handleMessages(data, ws, gameInfo));
        
      });
    return websocketServer;
  }; 
/////
interface ISelect { 
  id: ObjectId
}

const handleMessages = async (data: RawData, ws: WebSocket, gameInfo: GameSession) => {
  try {
    const parsedData = JSON.parse(data.toString());
    const command = parsedData.command.toLowerCase();
    const content = parsedData.content;
    if(!command || !content)
      throw new Error("Niepoprawne dane wejściowe")  
      switch(command) {
        case "select": 
          await gameController.handleGameSelection(ws, gameInfo, content);
          break;
        case "start":
          await gameController.handleGameStart(ws, gameInfo)
          break;
        case "next":
          await gameController.handleGameNext(ws, gameInfo);
          break;
        case "answer":
          await gameController.handleGameAnswer(ws, gameInfo, content);
          break;
        case "exit":
          ws.close();
          break;
        }
  } catch (error) {
    let msg = "Bład krytyczny"
    if(error instanceof SyntaxError)
      msg = "Bład danych wejściowych";
    if(error instanceof Error)
      msg = error.message;
    ws.send(`Error: ${msg}`);
  }
}




export default gameWebsocket;