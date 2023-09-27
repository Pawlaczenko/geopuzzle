import {  NextFunction, Request, Response } from "express";
import TrackModel from "../models/trackModel.js";
import { catchAsync } from "../utils/catchAsync.js";
import * as factoryHandler from "./factoryHandler.js";
import WaypointModel from "../models/waypointsModel.js";
import AppError from "../utils/appError.js";
import multer, { DiskStorageOptions, FileFilterCallback, Multer } from "multer";
import mongoose from "mongoose";
import { deleteFile } from "../utils/deleteFile.js";


type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

export const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
): void => {
    if (file.mimetype.split("/")[0] === "image")
        cb(null, true);
    cb(null, false)
    
}

const fileStorage = multer.diskStorage({
    destination: (
        req: Request,
        file: Express.Multer.File,
        cb: DestinationCallback
    ): void => {
        cb(null, "public/tracks/")
    },

    filename: (
        req: Request, 
        file: Express.Multer.File, 
        cb: FileNameCallback
    ): void => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `track-thumbnail-${Date.now()}.${ext}`);
    }
})

const upload = multer({ storage: fileStorage, fileFilter: fileFilter } );

export const getOneTrack = factoryHandler.getOne(TrackModel, "waypoints") 
export const getAllTrack = factoryHandler.getAll(TrackModel) 
export const addOneTrack = factoryHandler.addOne(TrackModel) 
export const deleteOneTrack = factoryHandler.deleteOne(TrackModel) 
export const updateOneTrack = factoryHandler.updateOne(TrackModel) 
export const addWaypointToTrack = catchAsync(async (req: Request, res: Response, next: NextFunction)=>{
    let query = await TrackModel.findById(req.params.id);
    if(!query)
        return next(new AppError(`Nie można znaleźć trasy o id: ${req.params.id}`, 400));
    let waypoint = new WaypointModel(req.body);
    query.waypoints?.push(waypoint._id);

    await query.save();
    await waypoint.save();
    res.status(201).json({
        status: "success",
        data:query
    })
})
export const deleteWaypointFromTrack = catchAsync(async (req: Request, res: Response, next: NextFunction)=>{
    if(!req.body.id)
        return next(new AppError(`Nie podano id punktu do usunięcia.`, 400));
    await TrackModel.findByIdAndUpdate(req.params.id, {
        $pull:{
            waypoints: req.body.id
        }
    });
    await WaypointModel.findByIdAndDelete(req.body.id);
    res.status(204).send();
})


export const updateTrackThumbnail = catchAsync(async (req:Request, res:Response, next: NextFunction)=>{
    if(!req.file)
        return next(new AppError(`Nie przesłano miniaturki trasy`,400));
    if(!mongoose.Types.ObjectId.isValid(req.params.id))
    {
        await deleteFile(req.file.path, next);
        return next(new AppError(`Nie poprawne id`,400));
    }
        
    let doc = await TrackModel.findById(req.params.id);
    if(!doc)
    {
        await deleteFile(req.file.path, next);
        return next(new AppError(`Trasa o id ${req.params.id} nie istnieje `,400));
    }

    if(doc.thumbnail !== process.env.TRACK_DEFAULT_THUMBNAIL)
        await deleteFile(`public\\${doc.thumbnail}`, next);
    
        
    doc.thumbnail = req.file.path.replace("public\\", "");
    await doc.save();
    res.status(200).json({
        status:"success",
        data:{
            message: doc
        }           
    })
});

//TODO: move remove functionality to track model
export const deleteTrackThumbnail = catchAsync(async (req:Request, res:Response, next: NextFunction)=>{
    let doc = await TrackModel.findById(req.params.id);
    if(!doc)
        return next(new AppError(`Trasa o id ${req.params.id} nie istnieje `,400));
    if(doc.thumbnail !== process.env.TRACK_DEFAULT_THUMBNAIL)
        await deleteFile(`public/${doc.thumbnail}`, next);
    let defaultThumbnail = "tracks/default.png"
    if(process.env.TRACK_DEFAULT_THUMBNAIL)
        defaultThumbnail = process.env.TRACK_DEFAULT_THUMBNAIL;

    doc.thumbnail = defaultThumbnail
    await doc.save();
    res.status(204).send();
});


export const uploadTrackThumbnail = upload.single('thumbnail');