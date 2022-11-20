const { request, response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const userGet = (req = request, res = response) => {
  const { q, name = "No name", apikey } = req.query;
  res.json({ message: "Get Api - Controler", q, name, apikey });
};

const userPost = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });
  // Validate if email exists
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return res.status(400).json({ message: `Email ${email} already exists` });
  }
  // Encrypt password
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);
  // Save to DB
  await user.save();
  res.json({ user });
};

const userPut = (req = request, res = response) => {
  const id = req.params.id;
  res.json({ message: "Put Api - Controler", id });
};

const userPatch = (req = request, res = response) => {
  res.json({ message: "Patch Api - Controler" });
};

const userDelete = (req = request, res = response) => {
  res.json({ message: "Delete Api - Controler" });
};

module.exports = {
  userGet,
  userPost,
  userPut,
  userPatch,
  userDelete,
};
