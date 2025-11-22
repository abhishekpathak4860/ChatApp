import axios from "axios";

const baseURL = import.meta.env.DEV
  ? "/api"
  : "https://chat-backend-in0f.onrender.com";

const API = axios.create({
  baseURL,
  withCredentials: true,
});

export default API;
