import dotenv from "dotenv";
import express, { Response, Request, Application, NextFunction } from "express";
import path from "path";
import cors from "cors";
import multer from "multer";

dotenv.config({ path: path.join(__dirname, "./../.env") });

const app: Application = express();

// Serve Static Content
app.use(express.static(path.join(__dirname, "./../public")));

// Middlewares
app.use(cors<Request>({ origin: "*" }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(multer().any());

// Routes
// Upload Route
app.post("/upload", (req: Request, res: Response) => {
  console.log(req.file, req.files);
  res.sendStatus(204);
});

app.listen(process.env.PORT, () => {
  console.log(`[${new Date()}] : server started running on port ${process.env.PORT}`);
});
