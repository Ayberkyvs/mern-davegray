import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import fs, { promises } from 'fs';
import path from 'path';
import type { Request, NextFunction, Response } from 'express';

const __dirname = path.dirname(import.meta.filename);

const logEvents = async (message:string, logFileName:string) => {
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
    const logItem = `${dateTime}\t${uuidv4()}\t${message}`;

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
             await promises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        await promises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem);
    }catch (error) {
        console.error(error);
    }
}

const logger = (req: Request, res: Response, next: NextFunction) => {
    logEvents(`${req.method}\t${req.url}\t${req.ip}\t${req.headers.origin}\n`, 'reqLog.log');
    console.log(`${req.method} ${req.path}`);
    next();
};

export {logger, logEvents};

