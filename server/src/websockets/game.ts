import { Server } from "http";
import {  WebSocketServer } from "ws";
// import { returnTrackDetails } from "../controllers/trackControllers.js";

  
const gameWebsocket = async (expressServer: Server) => {
    const websocketServer = new WebSocketServer({
      noServer: true,
      path: "/game",
    });
    // upgrading http request to websocket request
    expressServer.on("upgrade", (request, socket, head) => {
      websocketServer.handleUpgrade(request, socket, head, (websocket) => {
        websocketServer.emit("connection", websocket, request);
      });
    });
    websocketServer.on("connection", async (con, req,)=>{
      try {
        const id = req.url?.split("?")[1];
        if(!id)
          throw new Error("Nie podano id")
        
        // const gameDetails = await returnTrackDetails(id);
        con.send("Connected to game");
        con.on("message", (data)=>{
          console.log(data);
        })
      } catch (error) {
        if(error instanceof Error){
            con.send(error.message);            
        } else {
          con.send("Nieprzewidziany błąd");
        }
        con.send("Zamknięcie połaczenia z grą");
        con.close();
      }
        
    })
    websocketServer.on("error", (err)=>{
        console.log("err")
        console.log(err.message);
        websocketServer.close();
    })
    
    return websocketServer;
  }; 
  
export default gameWebsocket;