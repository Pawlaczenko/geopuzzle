import {  NextFunction, Request, Response } from "express";
import trackModel from "../models/trackModel.js";
import { catchAsync } from "../utils/catchAsync.js";
import * as factoryHandler from "../utils/factoryHandler.js";
import multer, {  FileFilterCallback,  } from "multer";
import AppError from "../utils/appError.js";
import { deleteFile } from "../utils/deleteFile.js";
import { unlink } from "fs";
import { ObjectId } from "mongodb";

//
// file upload for tracks
//

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


//
//crud
//
export const getOneTrack = factoryHandler.getOne(trackModel, "tags") 
export const getAllTrack = factoryHandler.getAll(trackModel, "tags") 
export const addOneTrack = factoryHandler.addOne(trackModel) 
export const deleteOneTrack = factoryHandler.deleteOne(trackModel) 
export const updateOneTrack = factoryHandler.updateOne(trackModel) 

//
//thumbanails
//


export const updateTrackThumbnail = catchAsync(async (req:Request, res:Response, next: NextFunction)=>{
        if(!req.file)
            return next(new AppError("Nie przesano miniaturki", 400));
        if(!ObjectId.isValid(req.params.id))
            {
                await unlink(req.file.path, (err)=>{});
                return next(new AppError("Id trasy nie prawidlowe", 400));
            }
            let doc = await trackModel.findById(req.params.id);
        if(!doc)
            {
                await unlink(req.file.path, (err)=>{});
                return next(new AppError("Nie znaleziono trasy o takim id", 400));
            }
        if(!doc.thumbnail.includes(process.env.TRACK_DEFAULT_THUMBNAIL!))
            await unlink(`public/${doc.thumbnail}`, (err)=>{});
        doc.thumbnail = `/tracks/${req.file.filename}`;
        await doc.save()
        res.status(200).json({
            status:"success",
            data:{
                message: doc
            }           
        })    
    
    
});
export const deleteTrackThumbnail = catchAsync(async (req:Request, res:Response, next: NextFunction)=>{
  
    const doc  = await trackModel.findById(req.params.id);
    if(!doc)
        return next(new AppError("Nie znaleziono trasy o takim id", 400));
           
    if(!doc?.thumbnail.includes(process.env.TRACK_DEFAULT_THUMBNAIL!))
        await unlink(`public/${doc.thumbnail}`, (err)=>{}) 
    doc.thumbnail = process.env.TRACK_DEFAULT_THUMBNAIL!;
    await doc.save();
   
    res.status(200).json({
        status:"success",
        data:{
            message: doc
        }           
    })   
 });
export const uploadTrackThumbnail = upload.single('thumbnail');