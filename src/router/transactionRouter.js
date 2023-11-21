import express from "express";
import {
  deleteManyTransaction,
  getTransactionByUserId,
  insertTransaction,
} from "../model/transaction/TransactionModel.js";
import { userAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

//insert
router.post("/", userAuth, async (req, res) => {
  try {
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

// delete
router.delete("/", userAuth, async (req, res) => {
  const { ids } = req.body;
  const result = await deleteManyTransaction(req.userId, ids);

  result?.deletedCount
    ? res.json({
        status: "success",
        message: "All The transactions has been deleted",
      })
    : res.json({
        status: "error",
        message:
          "Error, unable to delete the transactions. Please try again later",
      });
});

export default router;
