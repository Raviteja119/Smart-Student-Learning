import Navbar from "../components/Navbar";
import { FaClipboardList } from "react-icons/fa";
import { useState, useEffect } from "react";
import { getAssignments, submitAssignment as apiSubmit } from "../services/api";
import { useNavigate } from "react-router-dom";

function Assignments() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await getAssignments();
        setAssignments(res.data || []);
      } catch (err) {
        console.error(err);
        if (err.response && err.response.status === 401) navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [navigate]);

  const viewAssignment = (item) => {
    setOpen(item._id || item.id);
    alert(`${item.title} - Status: ${item.status} (Due ${item.due})`);
    console.log("View assignment:", item);
  };

  const submit = async (item) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please login to submit");
      navigate("/");
      return;
    }

    try {
      await apiSubmit(item._id || item.id, { file: "submitted-from-frontend" });
      alert("Submitted successfully");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Submission failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="page-container">
        <div className="page-header">
          <div>
            <h1>Assignments</h1>
            <p>
              Review your open assignments, view details, and submit your work
              with confidence.
            </p>
          </div>
          <div className="page-actions">
            <button className="btn-success" onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
          </div>
        </div>

        <div className="hero-section">
          <div className="hero-overlay">
            <h1>Assignments</h1>
            <p>Submit and Track Assignments</p>
          </div>
        </div>

        {loading ? (
          <div className="loading-state">Loading assignments...</div>
        ) : assignments.length === 0 ? (
          <div className="empty-state">No assignments are available at the moment.</div>
        ) : (
          <div className="card-grid">
            {assignments.map((item) => (
              <div className="glass-card" key={item._id || item.id}>
                <div className="card-icon">
                  <FaClipboardList />
                </div>

                <h3>{item.title}</h3>
                <p>Due Date: {item.due}</p>
                <p>Status: {item.status}</p>

                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    className="btn-primary"
                    onClick={() => viewAssignment(item)}
                  >
                    View Details
                  </button>
                  <button
                    className="btn-success"
                    onClick={() => submit(item)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Assignments;
