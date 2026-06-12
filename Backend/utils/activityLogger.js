const AuthLog = require("../models/AuthLog");

const logAction = async (userId, role, action, meta = "") => {
  try {
    await AuthLog.create({
      user: userId,
      role,
      action,
      meta
    });
  } catch (error) {
    console.error("Failed to log action:", error);
  }
};

module.exports = logAction;
