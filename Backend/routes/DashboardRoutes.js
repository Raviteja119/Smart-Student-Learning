const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  getAdminDashboard,
  getUserDashboard
} = require("../controllers/dashboardController");

router.get("/me", auth, getUserDashboard);
router.get("/", auth, role("admin"), getAdminDashboard);

module.exports = router;
