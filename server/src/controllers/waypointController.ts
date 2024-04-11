import { NextFunction , Request, Response} from "express";
import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import trackModel from "../models/trackModel.js";
import { isItOwner } from "../utils/isItOwner.js";
import FileUploaderBuilder from "../utils/fileUploader.js";

const waypointsFolder = "waypoints";
const fileUploader = new FileUploaderBuilder(waypointsFolder);
export const uploadPictureForWaypoint = fileUploader.upload.single("payload");
export const addGraphicWaypoint = catchAsync(async( req: Request, res:Response, next : NextFunction)=>{
    console.log(req.body)
    if(!req.file)
        return next(new AppError("Nie przesłano pliku graficznego", 400));
    const doc = await trackModel.findById(req.params.id);
    if(!doc)
        return next(new AppError("Nie znaleziono trasy o takim id",400));
    isItOwner(req, doc.userId);
    //postman glitch
    req.body.coords = (typeof req.body.coords === "string")?JSON.parse(req.body.coords):req.body.coords
    req.body.type = "Graphic";
    req.body.payload = `public/${waypointsFolder}/${req.file.filename}`
    doc.waypoints.push(req.body);
    await doc.save();
    res.status(200).json({
        status:"success",
        data:{
            message: doc
        }           
    })

}) 
export const addTextWaypoint = catchAsync(async( req: Request, res:Response ,next : NextFunction)=>{
    console.log(req.body)
    const doc = await trackModel.findById(req.params.id);
    if(!doc)
        return next(new AppError("Nie znaleziono trasy o takim id",400));
    isItOwner(req, doc.userId);
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
    const {trackId, waypointId, userId} = req.body;
    if(!trackId)
        return next(new AppError("Nie podano identyfikatora trasy", 400));
    if(!waypointId)
        return next(new AppError("Nie podano identyfikatora punktu", 400));
        const doc = await trackModel.findById(trackId);
    if(!doc)
        return next(new AppError("Nie znaleziono trasy o takim id",400));
    isItOwner(req, userId);
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
