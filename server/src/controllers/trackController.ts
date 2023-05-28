import Track from "../models/trackModel.js"
import { deleteOne, getAll, getOne, updateOne,addOne} from "./factoryHandler.js"

export const getOneTrack = getOne(Track);
export const getAllTracks = getAll(Track);
export const addOneTrack = addOne(Track);
export const deleteOneTrack = deleteOne(Track);
export const updateOneTrack = updateOne(Track);