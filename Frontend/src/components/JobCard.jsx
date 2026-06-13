function JobCard({ job, applyJob }) {

  return (
    <div className="card">

      <h3>{job.company}</h3>

      <h4>{job.role}</h4>

      <p>{job.description}</p>

      <button
        onClick={() => applyJob(job._id)}
      >
        Apply
      </button>

    </div>
  );
}

export default JobCard;