
import express, {Express, Request, Response, NextFunction } from "express"
import helmet from "helmet";
import hpp from 'hpp';
import errorHandler from "./controllers/errorHandler.js";
import AppError from "./utils/appError.js";
import xss from "xss-clean";
import ExpressMongoSanitize from "express-mongo-sanitize";
import APIrouter from "./routes/APIrouter.js";
const app:Express = express();

//Body parser
app.use(express.json({ limit: '10kb' }));

//Security

//HTTP response headers
app.use(helmet());
//Parameter pollution
app.use(hpp())
//Sanitize user query from cross stie script atacck
app.use(xss());
//mongoDB sanitazer
app.use(ExpressMongoSanitize())

//Routers

app.use("/api/", APIrouter)
app.all("*", (req:Request, res:Response, next:NextFunction) => {
 return next(new AppError("API Geopuzzle nie znalazło takiej podstrony", 404));
});
//Global Error Handler
app.use(errorHandler);
export default app;