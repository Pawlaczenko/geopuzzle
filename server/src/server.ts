import "dotenv/config"

import mongoose from "mongoose";
import app from "./app.js";
import gameWebsocket from "./websockets/game.js";

process.on("uncaughtException", (err) => {
  console.log(err, "\n");
  console.log(err.name, err.message);
  console.log("Shutting down");

  process.exit(1);
});
const PORT = process.env.PORT || 3000;
const DBConnectionString = process.env.DB_URL!
.replace('<password>',process.env.DB_PASS!)
.replace('<DB_Name>', process.env.NODE_ENV!);

mongoose
  .connect(DBConnectionString)
  .then(() => {
    console.log('GeoPuzzle Database connected');
  })
  .catch((error) => {
    console.log('Geopuzzle app cannot connect database');
    console.error(error)
  });
const server = app.listen(PORT, () => {
  console.log(`Server GeoPuzzle is running on ${PORT} port in ${process.env.NODE_ENV} mode`);
});
// game websocket upgrade
gameWebsocket(server);