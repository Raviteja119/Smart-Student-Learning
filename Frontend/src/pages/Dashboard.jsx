import Navbar from "../components/Navbar";
import {
  FaUserGraduate,
  FaBook,
  FaClipboardList,
  FaBriefcase,
  FaChartLine,
  FaTasks,
  FaUsersCog,
  FaChalkboardTeacher,
  FaChartBar
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDashboard } from "../services/api";

function Dashboard() {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const res = await getDashboard();
        setDashboard(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Unable to load dashboard");
        if (err.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [navigate]);

  const renderStats = () => {
    if (!dashboard) return null;

    if (dashboard.type === "student") {
      return (
        <div className="stats-grid">
          <div className="glass-card">
            <FaBook />
            <h2>{dashboard.stats.enrolledCourses}</h2>
            <p>Enrolled Courses</p>
          </div>
          <div className="glass-card">
            <FaClipboardList />
            <h2>{dashboard.stats.assignments}</h2>
            <p>Assignments Submitted</p>
          </div>
          <div className="glass-card">
            <FaBriefcase />
            <h2>{dashboard.stats.jobsApplied}</h2>
            <p>Jobs Applied</p>
          </div>
        </div>
      );
    }

    if (dashboard.type === "trainer") {
      return (
        <div className="stats-grid">
          <div className="glass-card">
            <FaChalkboardTeacher />
            <h2>{dashboard.stats.teachingCourses}</h2>
            <p>Courses Teaching</p>
          </div>
          <div className="glass-card">
            <FaUsersCog />
            <h2>{dashboard.stats.totalStudents}</h2>
            <p>Total Students</p>
          </div>
          <div className="glass-card">
            <FaChartBar />
            <h2>{dashboard.recentActivity?.length || 0}</h2>
            <p>Recent Actions</p>
          </div>
        </div>
      );
    }

    return (
      <div className="stats-grid">
        <div className="glass-card">
          <FaUserGraduate />
          <h2>{dashboard.students}</h2>
          <p>Students</p>
        </div>
        <div className="glass-card">
          <FaChalkboardTeacher />
          <h2>{dashboard.trainers}</h2>
          <p>Trainers</p>
        </div>
        <div className="glass-card">
          <FaBook />
          <h2>{dashboard.courses}</h2>
          <p>Courses</p>
        </div>
        <div className="glass-card">
          <FaBriefcase />
          <h2>{dashboard.jobs}</h2>
          <p>Jobs</p>
        </div>
      </div>
    );
  };

  const renderRecentActivity = () => {
    const items = dashboard?.recentActivity || [];
    return (
      <div className="activity-card">
        <h2>
          <FaTasks /> Recent Activity
        </h2>
        {items.length === 0 ? (
          <p>No recent activity yet.</p>
        ) : (
          <ul className="activity-list">
            {items.map((item) => (
              <li key={item._id}>
                <div>
                  <strong>{item.action}</strong>
                  <p>{item.meta || item.role}</p>
                </div>
                <span>{new Date(item.createdAt).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="empty-state">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="empty-state">{error}</div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <div className="hero-section hero-dashboard">
          <div className="hero-overlay">
            <h1>Welcome back, {dashboard?.user?.name || "Learner"}</h1>
            <p>
              {dashboard?.type === "student"
                ? "Continue your learning journey with personalized progress and task guidance."
                : dashboard?.type === "trainer"
                ? "Manage your courses, review student progress, and keep your classroom active."
                : "Review platform metrics, recent actions, and role-based system insights."}
            </p>
            <div className="hero-action-row">
              <button className="explore-btn" onClick={() => navigate("/courses")}>Explore Courses</button>
              <button className="btn-success" onClick={() => navigate("/jobs")}>View Jobs</button>
              <button className="btn-warning" onClick={() => navigate("/assignments")}>Assignments</button>
            </div>
          </div>
        </div>

        {renderStats()}

        <div className="dashboard-actions">
          <div className="activity-card">
            <h2>
              <FaBook />
              Quick Actions
            </h2>
            <div className="page-actions">
              <button className="btn-primary" onClick={() => navigate("/courses")}>Browse Courses</button>
              <button className="btn-success" onClick={() => navigate("/jobs")}>Apply for Jobs</button>
              <button className="btn-warning" onClick={() => navigate("/assignments")}>Submit Assignments</button>
            </div>
          </div>
        </div>

        <div className="dashboard-row">
          <div className="activity-card">
            <h2>
              <FaChartLine />
              Overview
            </h2>
            {dashboard?.type === "student" ? (
              <div className="summary-blocks">
                <div className="summary-item">
                  <h3>Enrolled Courses</h3>
                  <p>{dashboard.enrolledCourses?.length || 0}</p>
                </div>
                <div className="summary-item">
                  <h3>Assignments</h3>
                  <p>{dashboard.assignments?.length || 0}</p>
                </div>
                <div className="summary-item">
                  <h3>Jobs Applied</h3>
                  <p>{dashboard.jobsApplied?.length || 0}</p>
                </div>
              </div>
            ) : dashboard?.type === "trainer" ? (
              <div className="summary-blocks">
                <div className="summary-item">
                  <h3>Teaching Courses</h3>
                  <p>{dashboard.teachingCourses?.length || 0}</p>
                </div>
                <div className="summary-item">
                  <h3>Total Students</h3>
                  <p>{dashboard.totalStudents || 0}</p>
                </div>
                <div className="summary-item">
                  <h3>Recent Actions</h3>
                  <p>{dashboard.recentActivity?.length || 0}</p>
                </div>
              </div>
            ) : (
              <div className="summary-blocks">
                <div className="summary-item">
                  <h3>Students</h3>
                  <p>{dashboard.students || 0}</p>
                </div>
                <div className="summary-item">
                  <h3>Trainers</h3>
                  <p>{dashboard.trainers || 0}</p>
                </div>
                <div className="summary-item">
                  <h3>Courses</h3>
                  <p>{dashboard.courses || 0}</p>
                </div>
                <div className="summary-item">
                  <h3>Jobs</h3>
                  <p>{dashboard.jobs || 0}</p>
                </div>
              </div>
            )}
          </div>

          <div className="activity-card">
            <h2>
              <FaTasks /> Recent Activity
            </h2>
            {dashboard?.recentActivity?.length ? (
              <ul className="activity-list">
                {dashboard.recentActivity.map((item) => (
                  <li key={item._id}>
                    <div>
                      <strong>{item.action}</strong>
                      <p>{item.meta || item.role || item.user?.name}</p>
                    </div>
                    <span>{new Date(item.createdAt).toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No recent activity recorded.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;