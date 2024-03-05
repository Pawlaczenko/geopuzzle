import { ObjectId } from "mongoose";
import { TUser } from "../models/userModel.js";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number,
      NODE_ENV: 'development' | 'production',
      DB_URL: string,
      DB_PASS: string,
      TRACK_DEFAULT_THUMBNAIL:string,
      OAUTH20_GOOGLE_SECRET: string,
      OAUTH20_GOOGLE_CLIENT: string,
      JWT_SECRET: string,
      JWT_ISSUER: string,
      JWT_AUDIENCE: string,
    }
  }
 

}
export {};
