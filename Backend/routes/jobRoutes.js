const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  createJob,
  getJobs,
  applyJob
} = require("../controllers/jobController");

router.post(
  "/",
  auth,
  role("admin"),
  createJob
);

router.get(
  "/",
  auth,
  getJobs
);

router.post(
  "/apply/:id",
  auth,
  role("student"),
  applyJob
);

module.exports = router;