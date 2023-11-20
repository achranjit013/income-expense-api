import { getUserById } from "../module/user/UserModule.js";

export const userAuth = async (req, res, next) => {
  try {
    // check if user exist with _id or not
    const { authorization } = req.headers;

    const user = await getUserById(authorization);

    if (user?._id) {
      req.userId = authorization;
      next();
      return;
    }

    res.status(403).json({
      status: "error",
      message: "Authentication failed",
    });
  } catch (error) {
    next(error);
  }
};
