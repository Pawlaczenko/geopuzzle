// import { Server } from "http";
// import {  RawData, WebSocket, WebSocketServer } from "ws";
// import { ObjectId } from "mongodb";
// import * as gameController from "../controllers/gameControllers.js";

// type coords = {
//   att: number,
//   lat : number
// }

  
// const gameWebsocket = async (expressServer: Server) => {
//     const websocketServer = new WebSocketServer({
//       noServer: true,
//       path: "/game",
//     });
//     // upgrading http request to websocket request
//     expressServer.on("upgrade", (request, socket, head) => {
//       websocketServer.handleUpgrade(request, socket, head, (websocket) => {
//         websocketServer.emit("connection", websocket, request);
//       });
//     });
//     websocketServer.on("connection", async (con, req,)=>{
//       try {
//         //Parsing url to get track id 
//         const id = req.url?.split("?")[1];
//         if(!id)
//           throw new Error("Nie podano id")
//         //Searching for track and checking if it exists
//         const gameDetails : ITrack = await gameController.getTrackDetails(id);
//         if(gameDetails.waypoints.length < 1)
//           throw new Error("Wybrana trasa nie posiada punktów")
//         const gameInfo : Game = {
//           startedAt: null,
//           index: 0,
//           data: gameDetails,
//           gameScore: {
//             score: [],
//           }
//         }
//         con.send("Connected to game");
//         //handling message
//         con.on("message", (data)=>handleMessages(data, con, gameInfo))
//       } catch (error) {
//         /// Websocket Error Handling
//         if(error instanceof Error){
//             con.send(error.message);            
//         } else {
//           con.send("Nieprzewidziany błąd");
//         }
//         con.send("Zamknięcie połaczenia z grą");
//         con.close();
//       }
        
//     })
//     // Uncought errors
//     websocketServer.on("error", (err)=>{
//         console.log("err")
//         console.log(err.message);
//         websocketServer.close();
//     })
    
//     return websocketServer;
//   }; 
// /////

// const handleMessages = (data: RawData, ws: WebSocket, gameInfo: Game) => {
//   const parsedData = JSON.parse(data.toString());
//   const command = parsedData.command.toLowerCase();
//   console.log(command);
//   const content = parsedData.content;
//   switch(command) {
//     case "start":
//       handleGameStart(ws,gameInfo);
//       break;

//     case "answear":
//     case "exit":
//     default:
//       ws.send("Nieobsługiwane polecenie")
//   }
//   ws.send('test');
// }

// const sendGameStagInfo = (ws:WebSocket, game :Game)=>{
//   if (game.data.waypoints instanceof ObjectId)
//     throw new Error("Niepoprawny format scieżki");
//   const chosenStage = game.data.waypoints[game.index];
//   if(!chosenStage)
//     throw new Error("Nie znalezionio następnego punktu scięzki");
//   const info = JSON.stringify({}= chosenStage)
//   }

// const handleGameStart = (ws:WebSocket, game:Game)=>{
//   game.startedAt = new Date();
//   console.log(game.data.waypoints)
// } 
// const calcScore = (point: coords, game: Game, ws: WebSocket)=>{
//   const KmScaleDegree = 40075 / 360; // how many kilometers is one degree
//   const KmScaleMinute = KmScaleDegree / 60;  // how many kilometers is one minute
//   if( point.att )
// }
// export default gameWebsocket;