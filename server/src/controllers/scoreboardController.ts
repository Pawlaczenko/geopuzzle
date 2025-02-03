import { NextFunction, Request, Response } from "express";
import scoreboardModel from "../models/scoreboardModel.js"
import { catchAsync } from "../utils/catchAsync.js";
import * as factoryHandler from  "../utils/factoryHandler.js"
import AppError from "../utils/appError.js";
import { isItOwner } from "../utils/isItOwner.js";
import trackModel from "../models/trackModel.js";

export const getAllScoreboardEntries = factoryHandler.getAll(scoreboardModel);
export const truncateScroreboard = catchAsync(async (req: Request,res : Response,next : NextFunction)=>{
    const id = req.params.id;
    const {userId} = req.user as any;
    const doc = await trackModel.findById(id);
    if(!doc)
        throw new AppError(`Nie znalezionio trasy o id: ${id}}`, 400);
    isItOwner(req, userId);
    await scoreboardModel.deleteMany({trackId: id});
    res.status(204).json({
        status: "success"
    });
    
})