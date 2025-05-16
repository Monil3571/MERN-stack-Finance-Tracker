"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const financial_records_1 = __importDefault(require("./src/routes/financial-records"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
    throw new Error("Missing MONGO_URI in environment variables");
}
mongoose_1.default
    .connect(mongoURI)
    .then(() => console.log("Connected to MongoDB!"))
    .catch((err) => console.error("Failed to connect to MongoDB:", err));
// ROUTES
app.use("/financial-records", financial_records_1.default);
// GLOBAL ERROR HANDLER (MUST be after routes)
app.use((err, req, res, next) => {
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
