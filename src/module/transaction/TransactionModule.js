import TransactionSchema from "./TransactionSchema.js";

// create
export const insertTransaction = (tranObj) => {
  return TransactionSchema(tranObj).save();
};

// read by user _id
export const getTransactionByUserId = (userId) => {
  return TransactionSchema.find({ userId });
};

// delete
// update
