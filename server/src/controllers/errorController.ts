import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError.js";
import mongoose, { mongo } from "mongoose";
import { MongoServerError } from "mongodb";
import Passport from "passport-jwt";

//handling errors
const handleCastError = (error:mongoose.CastError)=>{
  const path = error.path.split(".");
  return new AppError(`Parametr: ${error.path} z wartością ${error.value} nie jest wspierany przez obiekt ${error.kind}`, 400);
}

const handleSyntaxError = (error:SyntaxError)=>{
  return new AppError("Bląd w składni", 400);
}

const handleValidationError = ( error : mongoose.Error.ValidationError)=>{
  const errors = Object.values(error.errors).map(el => `${el.path}: ${el.message}`);
  console.log(errors)
  let message = errors.join(". ");

  return new AppError(message, 400);
}
const hadnleMongoDuplicateErr = (err : MongoServerError)=>{
  return new AppError(`${Object.values(err.keyValue)[0] } jest zduplikowany`, 400)
}



//Send complete error for developer purpuse (develepment mode)
const sendErrorDev = (err:AppError, res:Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};
//send clean error to client (production mode)
const sendErrorProd = (err:AppError, res:Response) => {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  
};

 export default (err : unknown, req:Request, res:Response, next:NextFunction) => {
  if(process.env.NODE_ENV === "development")
    console.error(err);
  //error if app doesnt handle this exception
  let statusCode =  500;
  let errorMessage = 'Krytyczny bląd aplikacji';
  let error = new AppError(errorMessage, statusCode);

  //handle errors
  if(err instanceof AppError)
    error = err;
  if(err instanceof mongoose.Error.ValidationError)
    error = handleValidationError(err);
  if(err instanceof SyntaxError)
    error = handleSyntaxError(err);
  if (err instanceof mongoose.Error.CastError )
    error = handleCastError(err);
  if(err instanceof MongoServerError)
    {
      if(err.code === 11000)
        error = hadnleMongoDuplicateErr(err);
    }

  // send error to user
  // development mode data
  //  status, message, stack, whole error
  if(process.env.NODE_ENV === "production")
    sendErrorProd(error, res);
  // production mode data
  //  status, message
  if(process.env.NODE_ENV === "development")
    sendErrorDev(error, res);
};