// import express, {Request, Response} from "express";
// import mongoose from "mongoose";
// import FinancialRecordModel from "../schema/financial-record";

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


import express, { Request, Response, NextFunction, RequestHandler } from "express";
import FinancialRecordModel from "../schema/financial-record";

const router = express.Router();

// Helper to handle async/await errors
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// GET all records by userId
router.get("/getAllByUserID/:userId", asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  console.log("🔍 Fetching records for userId:", userId);

  if (!userId) {
    return res.status(400).send("Missing userId in request.");
  }

  const records = await FinancialRecordModel.find({ userId });

  console.log("✅ Found records:", records.length);

  res.status(200).json(records);
}));

// POST a new record
router.post("/", asyncHandler(async (req, res) => {
  const newRecordBody = req.body;

  console.log("📥 New record received:", newRecordBody);

  const newRecord = new FinancialRecordModel(newRecordBody);
  const savedRecord = await newRecord.save();

  console.log("✅ Record saved:", savedRecord);

  res.status(200).send(savedRecord);
}));

// PUT update a record by ID
router.put("/:id", asyncHandler(async (req, res) => {
  const id = req.params.id;
  const newRecordBody = req.body;

  console.log("🛠️ Updating record:", id);

  const updatedRecord = await FinancialRecordModel.findByIdAndUpdate(
    id,
    newRecordBody,
    { new: true }
  );

  if (!updatedRecord) {
    return res.status(404).send("Record not found.");
  }

  console.log("✅ Record updated:", updatedRecord);

  res.status(200).send(updatedRecord);
}));

// DELETE a record by ID
router.delete("/:id", asyncHandler(async (req, res) => {
  const id = req.params.id;

  console.log("🗑️ Deleting record:", id);

  const deletedRecord = await FinancialRecordModel.findByIdAndDelete(id);

  if (!deletedRecord) {
    return res.status(404).send("Record not found.");
  }

  console.log("✅ Record deleted:", deletedRecord);

  res.status(200).send(deletedRecord);
}));

export default router;
