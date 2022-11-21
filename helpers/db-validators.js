const Role = require("../models/role");
const User = require("../models/user");

const isValidRole = async (role = "") => {
  const roleExist = await Role.findOne({ role });
  if (!roleExist) {
    throw new Error(`Role ${role} is not a valid role`);
  }
};

const emailExists = async (email = "") => {
  const emailToValidate = await User.findOne({ email });
  if (emailToValidate) {
    throw new Error(`Email ${email} already exists`);
  }
};

const existsUserById = async (id = "") => {
  const userExist = await User.findById(id);
  if (!userExist) {
    throw new Error(`User with ID: ${id} doesn't exists`);
  }
};

module.exports = {
  isValidRole,
  emailExists,
  existsUserById,
};
