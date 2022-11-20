const Role = require("../models/role");

const isValidRole = async (role = "") => {
  const roleExist = await Role.findOne({ role });
  if (!roleExist) {
    throw new Error(`Role ${role} is not a valid role`);
  }
};

module.exports = {
  isValidRole,
};
