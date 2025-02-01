import express from "express";
import path from "path";
import dotenv from "dotenv";
import root from "./routes/root.ts";
import type { Request, Response } from "express";
dotenv.config();

const __dirname = path.resolve();
const app = express();
const PORT:number = Number(process.env.PORT) || 3001;

app.use('/', express.static(path.join(__dirname, '/public')));
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
app.listen(PORT, () => console.log("Server is running on port " + PORT));