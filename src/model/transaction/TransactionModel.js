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
export const deleteManyTransaction = (userId, ids) => {
  return TransactionSchema.deleteMany({ userId, _id: { $in: ids } });
};

// update
