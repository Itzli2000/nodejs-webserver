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
  // Encrypt password
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);
  // Save to DB
  await user.save();
  res.json({ user });
};

const userPut = async (req = request, res = response) => {
  const id = req.params.id;
  const { password, google, _id, ...rest } = req.body;
  // TODO validate ID against DB
  if (password) {
    const salt = bcrypt.genSaltSync();
    rest.password = bcrypt.hashSync(password, salt);
  }
  const user = await User.findByIdAndUpdate(id, rest);
  res.json({ user });
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
