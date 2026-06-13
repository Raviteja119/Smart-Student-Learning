const express = require("express");

const router = express.Router();

const auth = require("../middleware/AuthMiddleware");
const role = require("../middleware/RoleMiddleware");

const {
  getAdminDashboard,
  getUserDashboard
} = require("../controllers/DashboardController");

router.get("/me", auth, getUserDashboard);
router.get("/", auth, role("admin"), getAdminDashboard);

module.exports = router;
