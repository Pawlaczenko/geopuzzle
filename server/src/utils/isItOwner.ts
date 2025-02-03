
import { Request } from "express"
import AppError from "./appError.js"

export const isItOwner = (req: Request, idToCheck: any)=>{
    if(!req.user)
        throw new AppError("Brak danych o użytkowniku", 401);
    const {userId} = req.user as any;
    if(userId == idToCheck)
    {
        return true;   
    } else {
        throw new AppError("Nie możesz edytować nie swojego zasobu", 401)
    }
}