// src/api.js
import axios from "axios";
import { Platform } from "react-native";

const BASE_URL =
  Platform.OS === "android" || Platform.OS === "ios"
    ? "http://<Your-LAN-IP- Here>:3000/api"
    : "http://localhost:3000/api";

const api = axios.create({ baseURL: BASE_URL });

export default api;

/* -------------------- DREAM helpers ----------------------- */
export const getDreams = () => api.get("/dreams");
export const addDream = (data) => api.post("/dreams", data);
export const updateDream = (id, data) => api.put(`/dreams/${id}`, data);
export const deleteDream = (id) => api.delete(`/dreams/${id}`);

/* -------------------- STORY helpers ----------------------- */
export const getStories = () => api.get("/stories");
export const addStory = (data) => api.post("/stories", data);
export const updateStory = (id, data) => api.put(`/stories/${id}`, data);
export const deleteStory = (id) => api.delete(`/stories/${id}`);
