const express = require("express");

const router = express.Router();

const auth = require("../middleware/AuthMiddleware");
const role = require("../middleware/RoleMiddleware");

const {
  createAssignment,
  getAssignments,
  submitAssignment,
  evaluateAssignment
} = require("../controllers/AssignmentController");

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
