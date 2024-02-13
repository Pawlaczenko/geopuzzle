import { NextFunction, Request } from "express";
import { PathLike, unlink } from 'fs';
import AppError from './appError.js';
import { CallbackWithoutResultAndOptionalError } from "mongoose";

export const deleteFile = async(path : PathLike, next: NextFunction | CallbackWithoutResultAndOptionalError)=>{
    await unlink(path,(err)=>{})
}
