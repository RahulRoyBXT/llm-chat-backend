const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    userPhoto: {
      type: Buffer,
      required: [true, "Profile Photo Is needed"]
    },
    role:{
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}] // Friend List
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);