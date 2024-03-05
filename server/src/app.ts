import express, { Request, Response, NextFunction } from "express"
import helmet from "helmet";
import morgan from "morgan";
import hpp from 'hpp';
import errorHandler from "./controllers/errorController.js";
import AppError from "./utils/appError.js";
import ExpressMongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import trackRouter from "./routes/trackRouter.js";
import scoreboardRouter from "./routes/scoreboardRouter.js";
import authRouter from "./routes/authRouter.js";
import passport from "passport";
import { passportGoogle20, passportJWT } from "./controllers/authController.js";

const app = express();

app.options("*", cors())
if (process.env.NODE_ENV === "development") 
    app.use(morgan("tiny"));

const corsOptions = {
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
app.use(cors(corsOptions));
if (process.env.NODE_ENV === 'development')
    app.use(morgan('dev'));

//Body parser
app.use(express.json());

//Security
//HTTP response headers
app.use(helmet({
    crossOriginResourcePolicy: false,
}));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

//Parameter pollution
app.use(hpp());
//Sanitize user query from cross stie script atacck
//mongoDB sanitazer
app.use(ExpressMongoSanitize());
//serving static files
app.use(express.static('public'));


app.use(passport.initialize());
passport.use(passportJWT);
passport.use(passportGoogle20);
//Routers
app.use("/api/track", trackRouter);
app.use("/api/scoreboard", scoreboardRouter);
app.use("/auth", authRouter );
// Handling 404 routers
app.all("*", (req:Request, res:Response, next:NextFunction) => {
 return next(new AppError(`Geopuzzle nie znalazło takiego endpointu: ${req.url}`, 404));
});

//Global Error Handler
app.use(errorHandler);
export default app;