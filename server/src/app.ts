

import express, {Express, Request, Response, NextFunction } from "express"
import errorHandler from "./controllers/errorHandler.js";
const app:Express = express();

app.use(errorHandler);

app.all("*", (req:Request, res:Response, next:NextFunction) => {
  res.send("test");
});

export default app;