const express = require("express");

const router = express.Router();

const {
  createCourse,
  getCourses,
  enrollCourse
} = require("../controllers/CourseController");

const auth = require("../middleware/AuthMiddleware");
const role = require("../middleware/RoleMiddleware");

router.post(
  "/",
  auth,
  role("admin", "trainer"),
  createCourse
);

// Temporarily remove auth for testing
router.get(
  "/",
  getCourses
);

router.post(
  "/enroll/:id",
  auth,
  role("student"),
  enrollCourse
);

module.exports = router;
