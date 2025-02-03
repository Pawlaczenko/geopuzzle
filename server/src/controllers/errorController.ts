import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError.js";
import mongoose, { mongo } from "mongoose";
import { MongoServerError } from "mongodb";
import Passport from "passport-jwt";
import { unlink, unlinkSync } from "fs";

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



const sendErrorDev = (err:AppError, res:Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};
const sendErrorProd = (err:AppError, res:Response) => {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  
};

 export default async (err : unknown, req:Request, res:Response, next:NextFunction) => {
  if(process.env.NODE_ENV === "development")
    console.error(err);
  let statusCode =  500; 
  let errorMessage = 'Krytyczny bląd aplikacji';
  let error = new AppError(errorMessage, statusCode);
  if(req.file)
    unlinkSync(`${req.file.path}`);

  if(err instanceof AppError) // Obsługa błędów przewidzianych aplkiacji
    error = err;
  

  
  // Obsługa błedów z bibliotek
  if(err instanceof mongoose.Error.ValidationError)
    error = handleValidationError(err);
  
  //Syntax Error
  if(err instanceof SyntaxError)
    error = handleSyntaxError(err);


  if (err instanceof mongoose.Error.CastError )
    error = handleCastError(err);
  if(err instanceof MongoServerError)
    {
      if(err.code === 11000)
        error = hadnleMongoDuplicateErr(err);
    }
    // Wysłanie błedu do użytkownika,
    // Błąd zależy od wersji środowiska
  if(process.env.NODE_ENV === "production")
    sendErrorProd(error, res);
  if(process.env.NODE_ENV === "development")
    sendErrorDev(error, res);
};