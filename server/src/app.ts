import express, { Request, Response, NextFunction } from "express"
import APIrouter from "./routes/APIrouter.js";
import helmet from "helmet";
import morgan from "morgan";
import hpp from 'hpp';
import errorHandler from "./controllers/errorController.js";
import AppError from "./utils/appError.js";
import ExpressMongoSanitize from "express-mongo-sanitize";
const app = express();
if (process.env.NODE_ENV === 'development')
    app.use(morgan('dev'));
  
//Body parser
app.use(express.json());
//Security
//HTTP response headers
app.use(helmet());
//Parameter pollution
app.use(hpp());
//Sanitize user query from cross stie script atacck
//mongoDB sanitazer
app.use(ExpressMongoSanitize());
//serving static files
app.use(express.static('public'));
//Routers
app.use("/api", APIrouter);
// Handling 404 routers
app.all("*", (req:Request, res:Response, next:NextFunction) => {
 return next(new AppError("Geopuzzle nie znalazło takiej podstrony", 404));
});
//Global Error Handler
app.use(errorHandler);
export default app;