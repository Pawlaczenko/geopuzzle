import * as factoryHandler from  "../utils/factoryHandler.js"
import { tagModel } from "../models/tagModel.js";

export const addTag = factoryHandler.addOne(tagModel);
export const getAllTags = factoryHandler.getAll(tagModel);