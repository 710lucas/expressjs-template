import { Request, Response } from "express";

export function globalErrorHandler(err : Error & {statusCode? : number, message? : string}, req : Request, res : Response, next : any){
    console.error(err);
    res.status(err.statusCode || 500)
        .json({
            message: err.message || 'Internal Server Error'
        })
}