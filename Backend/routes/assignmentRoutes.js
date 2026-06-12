const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  createAssignment,
  getAssignments,
  submitAssignment,
  evaluateAssignment
} = require("../controllers/assignmentController");

router.post(
  "/",
  auth,
  role("trainer"),
  createAssignment
);

router.get(
  "/",
  auth,
  getAssignments
);

router.post(
  "/submit/:id",
  auth,
  role("student"),
  submitAssignment
);

router.put(
  "/evaluate/:id/:subId",
  auth,
  role("trainer"),
  evaluateAssignment
);

module.exports = router;