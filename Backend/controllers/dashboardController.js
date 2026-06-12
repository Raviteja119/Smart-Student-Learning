const User = require("../models/User");
const Course = require("../models/Course");
const Job = require("../models/Job");
const Assignment = require("../models/Assignment");
const AuthLog = require("../models/AuthLog");

exports.getAdminDashboard = async (req, res) => {
  try {
    const [students, trainers, admins, courses, jobs, assignments, recentAuthLogs] =
      await Promise.all([
        User.countDocuments({ role: "student" }),
        User.countDocuments({ role: "trainer" }),
        User.countDocuments({ role: "admin" }),
        Course.countDocuments(),
        Job.countDocuments(),
        Assignment.countDocuments(),
        AuthLog.find()
          .sort({ createdAt: -1 })
          .limit(12)
          .populate("user", "name email role")
      ]);

    const topCourses = await Course.aggregate([
      { $project: { title: 1, studentCount: { $size: "$students" } } },
      { $sort: { studentCount: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      type: "admin",
      students,
      trainers,
      admins,
      courses,
      jobs,
      assignments,
      topCourses,
      recentAuthLogs
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to load admin dashboard" });
  }
};

exports.getUserDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const recentActivity = await AuthLog.find({ user: user._id })
      .sort({ createdAt: -1 })
      .limit(8);

    if (user.role === "student") {
      const [enrolledCourses, assignments, jobsApplied] = await Promise.all([
        Course.find({ students: user._id }).populate("trainer", "name"),
        Assignment.find({ "submissions.student": user._id }).populate("course", "title"),
        Job.find({ applicants: user._id })
      ]);

      return res.json({
        type: "student",
        user,
        enrolledCourses,
        assignments,
        jobsApplied,
        recentActivity,
        stats: {
          enrolledCourses: enrolledCourses.length,
          assignments: assignments.length,
          jobsApplied: jobsApplied.length
        }
      });
    }

    if (user.role === "trainer") {
      const teachingCourses = await Course.find({ trainer: user._id }).populate("students", "name email");
      const totalStudents = teachingCourses.reduce((acc, course) => acc + (course.students?.length || 0), 0);

      return res.json({
        type: "trainer",
        user,
        teachingCourses,
        totalStudents,
        recentActivity,
        stats: {
          teachingCourses: teachingCourses.length,
          totalStudents,
          recentActivity: recentActivity.length
        }
      });
    }

    const [students, trainers, courses, jobs, assignments] = await Promise.all([
      User.countDocuments({ role: "student" }),
      User.countDocuments({ role: "trainer" }),
      Course.countDocuments(),
      Job.countDocuments(),
      Assignment.countDocuments()
    ]);

    return res.json({
      type: "admin",
      user,
      students,
      trainers,
      courses,
      jobs,
      assignments,
      recentActivity,
      stats: {
        students,
        trainers,
        courses,
        jobs,
        assignments
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to load dashboard" });
  }
};