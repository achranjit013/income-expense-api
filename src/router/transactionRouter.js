import express from "express";
import {
  getTransactionByUserId,
  insertTransaction,
} from "../module/transaction/TransactionModule.js";
import { userAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

//insert
router.post("/", userAuth, async (req, res) => {
  console.log("ffffffff");
  try {
    console.log("ffffffff");
    const result = await insertTransaction({ ...req.body, userId: req.userId });

    result?._id
      ? res.json({
          status: "success",
          message: "Transaction has been added successfylly.",
        })
      : res.json({
          status: "error",
          message: "Unable to add transaction. Please try again later.",
        });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

// get
router.get("/", userAuth, async (req, res, next) => {
  try {
    console.log("i am in get");
    const tranList = await getTransactionByUserId(req.userId);

    res.json({
      status: "success",
      message: "transaction list",
      tranList,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
