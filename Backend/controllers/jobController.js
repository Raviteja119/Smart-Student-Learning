const Job = require("../models/Job");

exports.createJob = async (req, res) => {

  const job = await Job.create(req.body);

  res.status(201).json(job);
};

exports.getJobs = async (req, res) => {

  const jobs = await Job.find();

  res.json(jobs);
};

exports.applyJob = async (req, res) => {

  const job = await Job.findById(req.params.id);

  if (!job.applicants.includes(req.user.id)) {

    job.applicants.push(req.user.id);

    await job.save();
  }

  res.json({
    message: "Applied Successfully"
  });
};