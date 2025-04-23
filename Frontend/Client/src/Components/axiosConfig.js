import axios from "axios";

const baseURL = import.meta.env.DEV
  ? "/api"
  : "https://chatapp-m947.onrender.com/api";

const API = axios.create({
  baseURL,
  withCredentials: true,
});

export default API;
