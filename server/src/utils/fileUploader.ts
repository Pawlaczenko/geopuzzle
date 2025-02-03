import { Request } from "express";
import { existsSync, mkdirSync } from "fs";
import multer, { FileFilterCallback, Multer } from "multer";

interface IFileUploader{
    name: string,
    // req: Request,
    upload: Multer,
    opt?: {
        destinationFolder?: string,
    }   
}

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void


class FileUploaderBuilder implements IFileUploader {
    name;
    upload;
    constructor(name : string){
        this.name = name;
        const fileFilter = (
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
                cb(null, `public/${this.name}/`)
            },
        
            filename: (
                req: Request, 
                file: Express.Multer.File, 
                cb: FileNameCallback
            ): void => {
                const ext = file.mimetype.split('/')[1];
                cb(null, `${this.name}-${Date.now()}.${ext}`);
            }
        })   
        const upload = multer({ storage: fileStorage, fileFilter: fileFilter } );
        this.upload = upload;
        if (!existsSync(`public/${this.name}`)){
            mkdirSync(`public/${this.name}`);
        }
    }
}
export default FileUploaderBuilder;