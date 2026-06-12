const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
  try {

    const course = await Course.create(req.body);

    res.status(201).json(course);

  } catch (error) {

    res.status(500).json(error);

  }
};

exports.getCourses = async (req, res) => {

  const courses = await Course.find()
    .populate("trainer", "name email");

  res.json(courses);
};

exports.enrollCourse = async (req, res) => {

  const course = await Course.findById(req.params.id);

  if (!course.students.includes(req.user.id)) {

    course.students.push(req.user.id);

    await course.save();
  }

  res.json({
    message: "Enrolled Successfully"
  });
};