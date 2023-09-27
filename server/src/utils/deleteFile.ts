import { NextFunction, Request } from "express";
import { PathLike, unlink } from 'fs';
import AppError from './appError.js';
import { CallbackWithoutResultAndOptionalError } from "mongoose";

export const deleteFile = async(path : PathLike, next: NextFunction | CallbackWithoutResultAndOptionalError)=>{
    await unlink(path,(err)=>{
        if(err)
            return next(new AppError("Nie można usunąć pliku, plik prawdopodobnie juz nie istnieje",403));
    })
}
