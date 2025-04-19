import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilepic: {
      type: String,
      required: true,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
