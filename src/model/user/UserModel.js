import UserSchema from "./UserSchema.js";

// insert user
export const insertUser = (userObj) => {
  return UserSchema(userObj).save();
};

// get user by their id
export const getUserById = (_id) => {
  return UserSchema.findById(_id);
};

// get user by their email
export const getUserByEmail = (email) => {
  return UserSchema.findOne({ email });
};

// update user

// delete user
