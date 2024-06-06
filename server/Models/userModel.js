const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minLength: [6, "Password should be atleast 6 character long"],
    },
  },
  {
    timestamps: true,
  }
);

User.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  const hashPass = await bcrypt.hash(this.password, salt);
  this.password = hashPass;
  next();
});

module.exports = mongoose.model("user", User);
