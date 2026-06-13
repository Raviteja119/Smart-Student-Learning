import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Attach token if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const register = (data) => API.post("/auth/register", data);
export const login = (data) => API.post("/auth/login", data);
export const getDashboard = () => API.get("/dashboard/me");

// Jobs
export const getJobs = () => API.get("/jobs");
export const applyJob = (id) => API.post(`/jobs/apply/${id}`);

// Courses
export const getCourses = () => API.get("/courses");
export const enrollCourse = (id) => API.post(`/courses/enroll/${id}`);

// Assignments
export const getAssignments = () => API.get("/assignments");
export const submitAssignment = (id, payload) => API.post(`/assignments/submit/${id}`, payload);

export default API;