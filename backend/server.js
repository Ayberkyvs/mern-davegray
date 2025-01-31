import express from "express";
import path from "path";
import dotenv from "dotenv";
import root from "./routes/root.js";
dotenv.config();

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 3001;

app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/', root);
app.listen(PORT, () => console.log("Server is running on port " + PORT));