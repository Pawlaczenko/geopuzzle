import { NextFunction , Request, Response} from "express";
import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import trackModel from "../models/trackModel.js";


export const addTextWaypoint = catchAsync(async( req: Request, res:Response ,next : NextFunction)=>{
    console.log(req.params)
    const doc = await trackModel.findById(req.params.id);
    if(!doc)
        return next(new AppError("Nie znaleziono trasy o takim id",400));
    req.body.type = "Text";
    doc.waypoints.push(req.body);
    await doc.save();
    res.status(200).json({
        status:"success",
        data:{
            message: doc
        }           
    })    

})
export const deleteWaypoint = catchAsync(async( req: Request, res:Response ,next : NextFunction)=>{
    const {trackId, waypointId} = req.body;
    if(!trackId)
        return next(new AppError("Nie podano identyfikatora trasy", 400));
    if(!waypointId)
        return next(new AppError("Nie podano identyfikatora punktu", 400));
        const doc = await trackModel.findById(trackId);
    if(!doc)
        return next(new AppError("Nie znaleziono trasy o takim id",400));
    const indexToRemove = doc.waypoints.findIndex(waypoint => waypoint.id === waypointId);
    if(indexToRemove !== -1)
        doc.waypoints.splice(indexToRemove, 1);

    await doc.save()
    res.status(200).json({
        status:"success",
        data:{
            message: doc
        }           
    })
})
