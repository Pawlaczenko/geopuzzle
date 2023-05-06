import { IError } from "../interfaces/IError.js";
class AppError extends Error implements IError{
    statusCode;
    status;
    isOperational;
    stack;
    constructor(message:string, statusCode:number) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode.toString()}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        this.stack = Error.captureStackTrace(this, this.constructor);
      }

  }
export default AppError