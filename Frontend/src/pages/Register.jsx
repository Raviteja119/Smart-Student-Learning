import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { register as apiRegister, login as apiLogin } from "../services/api";
import "./Login.css";

function Register() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      await apiRegister({ name, email, password, role });
      // Auto-login after register
      const res = await apiLogin({ email, password });
      const data = res.data;
      login(data);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">

        <div className="login-left">
          <h1>Smart Learning</h1>

          <p>
            🚀 Join Our Learning Platform
            <br /><br />
            📚 Learn Skills
            <br />
            🎯 Track Progress
            <br />
            💼 Get Placed
          </p>
        </div>

        <div className="login-right">

          <h2>Create Account</h2>

          <form onSubmit={handleRegister}>

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="role-selector">
              <div
                className={`role-card ${role === "student" ? "active" : ""}`}
                onClick={() => setRole("student")}
              >
                🎓 Student
              </div>

              <div
                className={`role-card ${role === "trainer" ? "active" : ""}`}
                onClick={() => setRole("trainer")}
              >
                👨‍🏫 Trainer
              </div>

              <div
                className={`role-card ${role === "admin" ? "active" : ""}`}
                onClick={() => setRole("admin")}
              >
                ⚙️ Admin
              </div>

            </div>

            <button
              type="submit"
              className="login-btn"
            >
              Create Account
            </button>

          </form>

          <div className="register-link">
            Already have an account?{" "}
            <Link to="/">
              Login
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Register;