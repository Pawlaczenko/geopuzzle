import AppError from "../utils/appError.js";
import { Document, Model} from "mongoose";
import { catchAsync } from "../utils/catchAsync.js";
import { NextFunction, Request, Response } from "express";


export const getAll = (model:Model<Document>) =>
  catchAsync(async (req:Request, res:Response) => {
    let query =  model.find();
    const doc = await query.select("-__v");

    res.status(200).json({
      status: "success",
      results: doc.length,
      data: doc,
    });
  });

export const getOne = (model:Model<Document>, popOptions?: string | string[]) =>
  catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    let query = model.findById(req.params.id).select("-__v");
    if (popOptions) query.populate(popOptions);
    const doc = await query;
    if (!doc) return next(new AppError("Nie można znaleźć dokumentu o id", 404));

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });
  export const deleteOne = (model:Model<Document>) =>
  catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    const doc = await model.findByIdAndDelete(req.params.id);

    if (!doc) return next(new AppError('Nie można znaleźć dokumentu o id', 404));

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
  export const addOne = (model:Model<Document>)=> catchAsync(async (req:Request, res:Response, next:NextFunction)=>{
    const doc = await model.create(req.body);

    res.status(201).json({
      status: "status",
      data:doc
    })
  })
  export const updateOne = (model:Model<Document>) =>
  catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    if (req.body.password || req.body.passwordConfirm)
      return next(new AppError("Nie możesz zmienić hasła tą scieżką", 403));

    const doc = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) return next(new AppError('Nie można znaleźć dokumentu o podanum id', 404));

    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });



