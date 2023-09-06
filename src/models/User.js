import { Schema, model } from "mongoose";
import { genSalt, hash, compare } from "bcryptjs";
const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
});
userSchema.methods.encryptPassword = async (password) => {
  const salt = await genSalt(10);
  return hash(password, salt);
};

userSchema.methods.validatePassword = async function (password) {
  return compare(password, this.password);
};

export default model("User", userSchema);
