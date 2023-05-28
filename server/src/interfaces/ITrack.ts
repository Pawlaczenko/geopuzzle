import { Document } from "mongoose";
export interface ITrack extends Document {
    name: string,
    author: string,
    tags:string,
    description: string,
    thumbnail: string;
    waypointsList: string,
  
}
