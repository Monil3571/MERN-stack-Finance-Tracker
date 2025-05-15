import express, { Express } from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./src/routes/financial-records";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();


const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  throw new Error("Missing MONGO_URI in environment variables");
}

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// ROUTES
app.use("/financial-records", financialRecordRouter);

// GLOBAL ERROR HANDLER (MUST be after routes)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong!";

  res.status(statusCode).json({
    success: false,
    message,
  });
});

// SERVER START
app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});
