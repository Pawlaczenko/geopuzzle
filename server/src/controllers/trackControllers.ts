import {  NextFunction, Request, Response } from "express";
import trackModel from "../models/trackModel.js";
import { catchAsync } from "../utils/catchAsync.js";
import * as factoryHandler from "../utils/factoryHandler.js";
import AppError from "../utils/appError.js";
import { unlink } from "fs";
import { ObjectId } from "mongodb";
import FileUploaderBuilder from "../utils/fileUploader.js";
import { isItOwner } from "../utils/isItOwner.js";

//
//crud
//
export const getOneTrack = factoryHandler.getOne(trackModel, "replays") 
export const getAllTrack = factoryHandler.getAll(trackModel) 
export const addOneTrack = factoryHandler.addOne(trackModel) 
export const deleteOneTrack = factoryHandler.deleteOne(trackModel, true) 
export const updateOneTrack = factoryHandler.updateOne(trackModel) 

//
//thumbanails
//
const thumnailFolder = "tracksThumbnails";

export const updateTrackThumbnail = catchAsync(async (req:Request, res:Response, next: NextFunction)=>{
        if(!req.file)
            return next(new AppError("Nie przesłano miniaturki", 400));

        if(!ObjectId.isValid(req.params.id))
            return next(new AppError("Id trasy nie prawidlowe", 400));
        let doc = await trackModel.findById(req.params.id);
        if(!doc)
            return next(new AppError("Nie znaleziono trasy o takim id", 400));
            

        isItOwner(req, doc.userId);
        if(!doc.thumbnail.includes(process.env.TRACK_DEFAULT_THUMBNAIL!))
            await unlink(`public/${doc.thumbnail}`, (err)=>{});
        doc.thumbnail = `/${thumnailFolder}/${req.file.filename}`;;
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
    isItOwner(req, doc.userId);      
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
const fileUploader = new FileUploaderBuilder(thumnailFolder) ;
export const uploadTrackThumbnail = fileUploader.upload.single("thumbnail");




