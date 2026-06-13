import Navbar from "../components/Navbar";
import { FaBriefcase } from "react-icons/fa";
import { useState, useEffect } from "react";
import { getJobs, applyJob as apiApplyJob } from "../services/api";
import { useNavigate } from "react-router-dom";

function Jobs() {
  const navigate = useNavigate();
  const [appliedIds, setAppliedIds] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await getJobs();
        setJobs(res.data || []);
      } catch (err) {
        console.error(err);
        if (err.response && err.response.status === 401) {
          navigate("/");
        }
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [navigate]);

  const applyJob = async (job) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please login to apply");
      navigate("/");
      return;
    }

    try {
      await apiApplyJob(job._id || job.id);
      setAppliedIds((prev) => [...prev, job._id || job.id]);
      alert(`Applied to ${job.company} for ${job.role}`);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to apply");
    }
  };

  return (
    <>
      <Navbar />

      <div className="page-container">
        <div className="page-header">
          <div>
            <h1>Placement Opportunities</h1>
            <p>
              Browse available jobs and apply quickly. Track your applications and
              move closer to your dream career.
            </p>
          </div>
          <div className="page-actions">
            <button className="btn-success" onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
          </div>
        </div>

        <div className="hero-section">
          <div className="hero-overlay">
            <h1>Placement Opportunities</h1>
            <p>Apply for Available Jobs</p>
          </div>
        </div>

        {loading ? (
          <div className="loading-state">Loading jobs...</div>
        ) : jobs.length === 0 ? (
          <div className="empty-state">No jobs available yet. Check back soon.</div>
        ) : (
          <div className="card-grid">
            {jobs.map((job) => (
              <div className="glass-card" key={job._id || job.id}>
                <div className="card-icon">
                  <FaBriefcase />
                </div>

                <h3>{job.company}</h3>
                <p>{job.role}</p>
                <p>{job.location}</p>

                <button
                  className="btn-primary"
                  onClick={() => applyJob(job)}
                  disabled={appliedIds.includes(job._id || job.id)}
                >
                  {appliedIds.includes(job._id || job.id) ? "Applied" : "Apply Now"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Jobs;
