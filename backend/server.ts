import express from "express";
import type { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import root from "./routes/root.ts";
import { logger } from "./middleware/logger.ts";
import errorHandler from "./middleware/errorHandler.ts";
import cookieParser from "cookie-parser";
import cors from "cors";
import corsOptions from "./config/corsOptions.ts";

dotenv.config();
const __dirname = path.dirname(import.meta.filename);
const app = express();
const PORT:number = Number(process.env.PORT) || 3001;

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, 'public')));
// express.static is a built-in middleware function in Express. It serves static files and is based on serve-static.
// shortend version of app.use(express.static('public'));
app.use('/', root);
app.all('*', (req: Request, res: Response) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }else if (req.accepts('json')) {
        res.send({ error: '404 Not Found' });
    }else {
        res.type('txt').send('404 Not Found');
    }
})

app.use(errorHandler);
app.listen(PORT, () => console.log("Server is running on port " + PORT));