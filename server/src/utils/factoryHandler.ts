import AppError from "../utils/appError.js";
import {  Document, HydratedDocument, Model, Query, Schema} from "mongoose";
import { catchAsync } from "../utils/catchAsync.js";
import { NextFunction, Request, Response } from "express";
import APIfeatures from "./APIFeatures.js";


export const getAll = (model:Model<any>, popOptions?: string | string[]) =>
  catchAsync(async (req:Request, res:Response) => {
    const query = model.find();
    const features = await new APIfeatures(query, req.query).filter().search().sort().limitFields().paginate();
    const doc = await features.query;
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
  export const deleteOne = <T>(model:Model<T>) =>
  catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    const doc = await model.findByIdAndDelete(req.params.id);
    if (!doc) return next(new AppError(`Nie można znaleźć dokumentu o id: ${req.params.id}`, 404));
    res.status(204).send();
  });
  export const addOne = <T>(model:Model<T>)=> catchAsync(async (req:Request, res:Response, next:NextFunction)=>{
    const doc = await model.create(req.body);

    res.status(201).json({
      status: "status",
      data:doc
    })
  })
  export const updateOne = <T>(model:Model<T>) =>
  catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    if (req.body.password || req.body.passwordConfirm)
      return next(new AppError("Nie możesz zmienić hasła tą scieżką", 403));

    const doc = await model.findById(req.params.id);
    if (!doc) return next(new AppError(`Nie można znaleźć dokumentu o id: ${req.params.id}`, 404));
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



