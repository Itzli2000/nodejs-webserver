const { request, response } = require("express");

const userGet = (req = request, res = response) => {
  const { q, name = "No name", apikey } = req.query;
  res.json({ message: "Get Api - Controler", q, name, apikey });
};

const userPost = (req = request, res = response) => {
  const { name, age } = req.body;
  res.json({ message: "Post Api - Controler", name, age });
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
