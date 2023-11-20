import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;

// middleware
app.use(express.json());
app.use(cors());

// db connection
import { connectMongoDB } from "./src/config/dbConfig.js";
connectMongoDB();

// routers
import userRouter from "./src/router/userRouter.js";
import transactionRouter from "./src/router/transactionRouter.js";

// user
app.use("/api/v1/user", userRouter);
// transaction
app.use("/api/v1/transaction", transactionRouter);

app.use("/", (req, res) => {
  res.json({
    status: "success",
    message: "server is running",
  });
});

// error handling
app.use((error, req, res, next) => {
  const errorCode = error.errorCode || 500;

  res.status(errorCode).json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`server is running at http://localhost:${PORT}`);
});
