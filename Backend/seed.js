const connectDB = require("./config/Database");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

const User = require("./models/User");
const Job = require("./models/Job");
const Course = require("./models/Course");
const Assignment = require("./models/Assignment");

const run = async () => {
  await connectDB();

  const trainerEmail = "trainer@example.com";
  const adminEmail = "admin@example.com";
  const studentEmail = "student@example.com";

  const hashedPassword = await bcrypt.hash("Password123", 10);

  const admin = await User.findOneAndUpdate(
    { email: adminEmail },
    {
      name: "Admin User",
      email: adminEmail,
      password: hashedPassword,
      role: "admin"
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  const trainer = await User.findOneAndUpdate(
    { email: trainerEmail },
    {
      name: "Trainer User",
      email: trainerEmail,
      password: hashedPassword,
      role: "trainer"
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  const student = await User.findOneAndUpdate(
    { email: studentEmail },
    {
      name: "Sample Student",
      email: studentEmail,
      password: hashedPassword,
      role: "student"
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  const jobs = [
    {
      company: "TCS",
      role: "Internship",
      location: "Hyderabad",
      description: "Full-stack development internship for freshers.",
    },
    {
      company: "Google",
      role: "Frontend Intern",
      location: "Bengaluru",
      description: "Work on modern React applications.",
    }
  ];

  const createdJobs = await Promise.all(
    jobs.map(async (job) => {
      return Job.findOneAndUpdate(
        { company: job.company, role: job.role },
        job,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    })
  );

  const courses = [
    {
      title: "React Fullstack",
      description: "Build modern web apps using React, Node.js, and MongoDB.",
      trainer: trainer._id,
      icon: "⚛️",
      progress: "20%",
      progressPercent: 20
    },
    {
      title: "Node.js Bootcamp",
      description: "Learn backend development, APIs, and databases.",
      trainer: trainer._id,
      icon: "🟢",
      progress: "10%",
      progressPercent: 10
    }
  ];

  const createdCourses = await Promise.all(
    courses.map(async (course) => {
      return Course.findOneAndUpdate(
        { title: course.title },
        course,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    })
  );

  const assignments = [
    {
      title: "React Project",
      description: "Create a portfolio website using React.",
      due: "2026-06-20",
      status: "Open",
      course: createdCourses[0]._id
    },
    {
      title: "API Challenge",
      description: "Build a REST API using Node.js and Express.",
      due: "2026-06-22",
      status: "Open",
      course: createdCourses[1]._id
    }
  ];

  await Promise.all(
    assignments.map(async (assignment) => {
      return Assignment.findOneAndUpdate(
        { title: assignment.title },
        assignment,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    })
  );

  console.log("Sample seed data created.");
  console.log(`admin: ${adminEmail} / Password123`);
  console.log(`trainer: ${trainerEmail} / Password123`);
  console.log(`student: ${studentEmail} / Password123`);

  process.exit(0);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
