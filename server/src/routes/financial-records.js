"use strict";
// import express, {Request, Response} from "express";
// import mongoose from "mongoose";
// import FinancialRecordModel from "../schema/financial-record";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const router = express.Router();
// router.get("/getAllByUserID/:userId", async (req: Request,res: Response) => {
//     try {
//         const userId = req.params.userId;
//         const records = await FinancialRecordModel.find({userId: userId});
//         if(records.length === 0){
//             return res.status(404).send("No records found for the user.");
//         }
//         res.status(200).send(records);
//     } catch (err){
//         res.status(500).send(err);
//     }
// });
// router.post("/", async (req: Request,res: Response) => {
//     try {
//         const newRecordBody =req.body;
//         const newRecord = new FinancialRecordModel(newRecordBody);
//         const savedRecord = await newRecord.save();
//         res.status(200).send(savedRecord);
//     }
//      catch (err){
//         res.status(500).send(err);
//     }
// });
// router.put("/:id", async (req: Request,res: Response) => {
//     try {
//         const id = req.params.id;
//         const newRecordBody = req.body;
//         const record = await FinancialRecordModel.findByIdAndUpdate(
//             id,
//             newRecordBody,
//             {new: true}
//         );
//         if(!record) return res.status(404).send();
//         res.status(200).send(record);
//     }
//      catch (err){
//         res.status(500).send(err);
//     }
// });
// router.delete("/:id", async (req: Request,res: Response) => {
//     try {
//         const id = req.params.id;
//         const record = await FinancialRecordModel.findOneAndDelete(id);
//         if(!record) return res.status(404).send();
//         res.status(200).send(record);
//     }
//      catch (err){
//         res.status(500).send(err);
//     }
// });
// export default router;
// import express, { Request, Response, NextFunction, RequestHandler } from "express";
// import mongoose from "mongoose";
// import FinancialRecordModel from "../schema/financial-record";
// const router = express.Router();
// // Helper to handle async errors cleanly
// const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>): RequestHandler => {
//     return (req, res, next) => {
//         Promise.resolve(fn(req, res, next)).catch(next);
//     };
// };
// // GET all records by userId
// router.get("/getAllByUserID/:userId", asyncHandler(async (req, res) => {
//     try {
//       const userId = req.params.userId;
//       console.log("Fetching records for userId:", userId); // Debug log
//       const records = await FinancialRecordModel.find({ userId });
//       console.log("Found records:", records.length);
//       res.status(200).json(records);
//     } catch (err) {
//       console.error("Error in GET /getAllByUserID:", err);
//       res.status(500).send("Server error");
//     }
//   }));
// // POST a new record
// router.post("/", asyncHandler(async (req, res) => {
//     try {
//         const newRecordBody = req.body;
//         const newRecord = new FinancialRecordModel(newRecordBody);
//         const savedRecord = await newRecord.save();
//         res.status(200).send(savedRecord);
//       } catch (err) {
//         console.error("Error in POST /financial-records:", err); // ADD THIS
//         res.status(500).send(err);
//       }
// }));
// // PUT update a record by ID
// router.put("/:id", asyncHandler(async (req, res) => {
//     const id = req.params.id;
//     const newRecordBody = req.body;
//     const updatedRecord = await FinancialRecordModel.findByIdAndUpdate(
//         id,
//         newRecordBody,
//         { new: true }
//     );
//     if (!updatedRecord) {
//         return res.status(404).send("Record not found.");
//     }
//     res.status(200).send(updatedRecord);
// }));
// // DELETE a record by ID
// router.delete("/:id", asyncHandler(async (req, res) => {
//     const id = req.params.id;
//     const deletedRecord = await FinancialRecordModel.findByIdAndDelete(id);
//     if (!deletedRecord) {
//         return res.status(404).send("Record not found.");
//     }
//     res.status(200).send(deletedRecord);
// }));
// export default router;
const express_1 = __importDefault(require("express"));
const financial_record_1 = __importDefault(require("../schema/financial-record"));
const router = express_1.default.Router();
// Helper to handle async/await errors
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
// GET all records by userId
router.get("/getAllByUserID/:userId", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    console.log("🔍 Fetching records for userId:", userId);
    if (!userId) {
        return res.status(400).send("Missing userId in request.");
    }
    const records = yield financial_record_1.default.find({ userId });
    console.log("✅ Found records:", records.length);
    res.status(200).json(records);
})));
// POST a new record
router.post("/", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newRecordBody = req.body;
    console.log("📥 New record received:", newRecordBody);
    const newRecord = new financial_record_1.default(newRecordBody);
    const savedRecord = yield newRecord.save();
    console.log("✅ Record saved:", savedRecord);
    res.status(200).send(savedRecord);
})));
// PUT update a record by ID
router.put("/:id", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const newRecordBody = req.body;
    console.log("🛠️ Updating record:", id);
    const updatedRecord = yield financial_record_1.default.findByIdAndUpdate(id, newRecordBody, { new: true });
    if (!updatedRecord) {
        return res.status(404).send("Record not found.");
    }
    console.log("✅ Record updated:", updatedRecord);
    res.status(200).send(updatedRecord);
})));
// DELETE a record by ID
router.delete("/:id", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    console.log("🗑️ Deleting record:", id);
    const deletedRecord = yield financial_record_1.default.findByIdAndDelete(id);
    if (!deletedRecord) {
        return res.status(404).send("Record not found.");
    }
    console.log("✅ Record deleted:", deletedRecord);
    res.status(200).send(deletedRecord);
})));
exports.default = router;
