import express, { Express } from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-records";
import cors from "cors";
const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
const mongoURI: string =
  "mongodb+srv://monilpatel234:fei36eFbcKp1pTBd@personalfinancetracker.igraufj.mongodb.net/";

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
