const { Schema, model } = require("mongoose");

const userSchema = Schema({
  name: {
    type: String,
    required: [true, "Must provide a name"],
  },
  email: {
    type: String,
    required: [true, "Must provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Must provide a password"],
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  state: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};

module.exports = model("User", userSchema);
