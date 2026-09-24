import axios from "axios";

const api = axios.create({
  baseURL: "https://notoria-backend-6qj0.onrender.com/api",
});

export default api;