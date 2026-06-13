import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Landing() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="landing-page">
        <div className="landing-hero">
          <div className="landing-copy">
            <span className="eyebrow">Smart Learning Platform</span>
            <h1>Learn smarter, track progress, and land your dream career.</h1>
            <p>
              A complete student, trainer, and admin portal with role-aware
              dashboards, course management, assignments, and placement tools.
            </p>
            <div className="landing-actions">
              <button className="btn-primary" onClick={() => navigate("/register")}>Get Started</button>
              <button className="btn-success" onClick={() => navigate("/login")}>Login</button>
            </div>
          </div>
          <div className="landing-visual">
            <div className="hero-card hero-card-top">
              <h3>Role dashboards</h3>
              <p>Student, trainer, and admin views with tailored actions.</p>
            </div>
            <div className="hero-card hero-card-mid">
              <h3>Interactive learning</h3>
              <p>Track courses, assignments, and placement activity in one place.</p>
            </div>
            <div className="hero-card hero-card-bottom">
              <h3>Secure auth</h3>
              <p>JWT login flow with access control for every role.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
