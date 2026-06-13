import Navbar from "../components/Navbar";
import { FaReact } from "react-icons/fa";
import { useState, useEffect } from "react";
import { getCourses, enrollCourse as apiEnroll } from "../services/api";
import { useNavigate } from "react-router-dom";

function Courses() {
  const navigate = useNavigate();
  const [inProgress, setInProgress] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await getCourses();
        setCourses(res.data || []);
      } catch (err) {
        console.error(err);
        if (err.response && err.response.status === 401) navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [navigate]);

  const continueCourse = async (course) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please login to enroll");
      navigate("/");
      return;
    }

    try {
      await apiEnroll(course._id || course.id);
      setInProgress((p) => [...p, course._id || course.id]);
      alert(`Enrolled in ${course.title}`);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to enroll");
    }
  };

  return (
    <>
      <Navbar />

      <div className="page-container">
        <div className="page-header">
          <div>
            <h1>Courses</h1>
            <p>
              Explore curated courses, enroll with a single click, and continue
              your learning journey with progress-tracked lessons.
            </p>
          </div>
          <div className="page-actions">
            <button className="btn-success" onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
          </div>
        </div>

        <div className="hero-section">
          <div className="hero-overlay">
            <h1>Courses</h1>
            <p>Explore and Track Your Learning Journey</p>
          </div>
        </div>

        {loading ? (
          <div className="loading-state">Loading courses...</div>
        ) : courses.length === 0 ? (
          <div className="empty-state">No courses are available right now. Check again later.</div>
        ) : (
          <div className="card-grid">
            {courses.map((course) => (
              <div className="glass-card" key={course._id || course.id}>
                <div className="card-icon">
                  {course.icon || <FaReact />}
                </div>

                <h3>{course.title}</h3>
                <p>{course.description}</p>

                <div className="progress-container">
                  <div
                    className="progress-bar"
                    style={{ width: course.progress || (course.progressPercent ? `${course.progressPercent}%` : "0%") }}
                  ></div>
                </div>

                <span>{course.progress || "0%"} Completed</span>

                <button
                  className="btn-primary"
                  onClick={() => continueCourse(course)}
                  disabled={inProgress.includes(course._id || course.id)}
                >
                  {inProgress.includes(course._id || course.id) ? "Enrolled" : "Enroll Now"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Courses;
