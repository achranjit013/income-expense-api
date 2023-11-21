import express from "express";
import { getUserByEmail, insertUser } from "../model/user/UserModel.js";
import { comparePassword, hashPassword } from "../utils/bcryptHelper.js";

const router = express.Router();

// read
router.get("/", (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "to complete get",
    });
  } catch (error) {
    next(error);
  }
});

// create or insert
router.post("/", async (req, res, next) => {
  try {
    req.body.password = hashPassword(req.body.password);
    const result = await insertUser(req.body);

    result?._id
      ? res.json({
          status: "success",
          message:
            "Congratulations!!! Your account has been created. You may login now.",
        })
      : res.json({
          status: "error",
          message:
            "Sorry, unable to create account. Please try again later or contact admin.",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message =
        "Email already taken. Please try again with another email.";
      error.errorCode = 200;
    }
    next(error);
  }
});

// login
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check if user exists for the given email
    const result = await getUserByEmail(email);
    console.log("i am in user router");
    console.log(result);
    if (result?.password) {
      // check if the plain password and the password from db is the same
      const isMatched = comparePassword(password, result.password);

      if (isMatched) {
        result.password = undefined;
        return res.json({
          status: "success",
          message: "Login successful.",
          user: result,
        });
      }
    }
    console.log("after if");

    return res.json({
      status: "error",
      message: "Invalid login details.",
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message =
        "Email already taken. Please try again with another email.";
      error.errorCode = 200;
    }
    next(error);
  }
});

// update -> all
router.put("/", (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "to complete put",
    });
  } catch (error) {
    next(error);
  }
});

// update -> some
router.patch("/", (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "to complete patch",
    });
  } catch (error) {
    next(error);
  }
});

// delete
router.delete("/", (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "to complete delete",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
