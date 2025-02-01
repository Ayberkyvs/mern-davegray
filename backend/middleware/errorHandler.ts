import { logEvents } from "./logger.ts";
import type { Request, Response, NextFunction } from "express";


const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}\n`, 'errLog.log');
    console.log(err.stack);

    const status = res.statusCode ? res.statusCode : 500;
    res.status(status)
    res.json({message: err.message});
}

export default errorHandler;