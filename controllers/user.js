const { request, response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const userGet = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
      .limit(Number(limit)) // limit amount of results
      .skip(Number(from)), // Return results starting from
  ]);
  res.json({ total, users });
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
  res.json(user);
};

const userPatch = (req = request, res = response) => {
  res.json({ message: "Patch Api - Controler" });
};

const userDelete = async (req = request, res = response) => {
  const { id } = req.params;
  // Delete user from DB
  // const user = await User.findByIdAndDelete(id); // Not recommended
  const user = await User.findByIdAndUpdate(id, { state: false });
  res.json(user);
};

module.exports = {
  userGet,
  userPost,
  userPut,
  userPatch,
  userDelete,
};
