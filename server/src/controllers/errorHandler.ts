import { Request, Response, NextFunction } from "express";
import { IError } from "../interfaces/IError.js";
//Send complete error for developer purpuse (develepment mode)
const sendErrorDev = (err:IError, res:Response) => {
  
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};
//send clean error to client (production mode)
const sendErrorProd = (err:IError, res:Response) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Krytyczny bląd aplikacji'
    });
  }
};

 export default (err: IError, req:Request, res:Response, next:NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') sendErrorDev(err, res);
  else if (process.env.NODE_ENV === 'production') {
    let error = JSON.parse(JSON.stringify(err));
    error.message = err.message;
    // handle custom errors 
    sendErrorProd(error, res);
  }
};