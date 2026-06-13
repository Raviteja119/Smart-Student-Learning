import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { login as apiLogin } from "../services/api";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const res = await apiLogin({ email, password });
      const data = res.data;
      // save token and user via context
      login(data);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">

        <div className="login-left">
          <h1>Smart Learning</h1>

          <p>
            Learn Skills <br />
            Track Progress <br />
            Get Placed
          </p>
        </div>

        <div className="login-right">
          <h2>Welcome Back</h2>

          <form onSubmit={handleLogin}>

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <button
              type="submit"
              className="login-btn"
            >
              Login
            </button>

          </form>

          <div className="register-link">
            New User?{" "}
            <Link to="/register">
              Register
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;