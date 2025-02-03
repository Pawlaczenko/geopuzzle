import AppError from "../utils/appError.js";
import {  Document, HydratedDocument, Model, Query, Schema} from "mongoose";
import { catchAsync } from "../utils/catchAsync.js";
import { NextFunction, Request, Response } from "express";
import APIfeatures from "./APIFeatures.js";
import { isItOwner } from "./isItOwner.js";


export const getAll = (model:Model<any>) =>
  catchAsync(async (req:Request, res:Response) => {
    
    let query = model.find();
    const features = new APIfeatures(query, req.query).filter().search().sort().limitFields().paginate();
    let doc = await features.query;
    res.status(200).json({
      status: "success",
      results: doc.length,
      data: doc,
    });
  });

  

export const getOne = <T>(model:Model<T>, popOptions?: string | string[]) =>
  catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    let query = model.findById(req.params.id).select("-__v")
    if (popOptions) query.populate(popOptions);
    const doc = await query;
    if (!doc) return next(new AppError(`Nie można znaleźć dokumentu o id: ${req.params.id}`, 404));
    res.status(200).json({
      status: "success",
      data: doc.toObject({virtuals: true, "depopulate": true}),
    });
  });

export const deleteOne = <T>(model:Model<T>, ownershipRestrict?: boolean) =>
  catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    const doc = await model.findById(req.params.id);
    if (!doc) return next(new AppError(`Nie można znaleźć dokumentu o id: ${req.params.id}`, 404));
    if(ownershipRestrict)
      {
        const userId = doc.get("userId");
        if(!userId)
            return;
        isItOwner(req, userId)
      }

    await doc.deleteOne();
    res.status(204).send();
  });

export const addOne = <T>(model:Model<T>)=> catchAsync(async (req:Request, res:Response, next:NextFunction)=>{
    const doc = await model.create(req.body);

    res.status(201).json({
      status: "success",
      data:doc
    })
})
  
export const updateOne = <T>(model:Model<T>, ownershipRestrict?: boolean) =>
  catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    const doc = await model.findById(req.params.id);
    if (!doc) return next(new AppError(`Nie można znaleźć dokumentu o id: ${req.params.id}`, 404));
    if(ownershipRestrict)
      {
        const userId = doc.get("userId");
        if(!userId)
            return;
        isItOwner(req, userId)
      }
    Object.keys(req.body).forEach((key) => {
      // @ts-ignore
      doc[key] = req.body[key];
    });

    // Save the document
    await doc.save();
    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });



