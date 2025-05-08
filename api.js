import { Platform } from "react-native";

export const BASE_URL =
  Platform.OS === "android" || Platform.OS === "ios"
    ? "http://<YOUR_LAN_IP>:3000/api"
    : "http://localhost:3000/api";

// Dreams

export const fetchDreams = async () => {
  const res = await fetch(`${BASE_URL}/dreams`);
  return await res.json();
};

export const addDream = async (dream) => {
  const res = await fetch(`${BASE_URL}/dreams`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dream),
  });
  return await res.json();
};

export const updateDream = async (id, dream) => {
  const res = await fetch(`${BASE_URL}/dreams/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dream),
  });
  return await res.json();
};

export const deleteDream = async (id) => {
  const res = await fetch(`${BASE_URL}/dreams/${id}`, {
    method: "DELETE",
  });
  return await res.json();
};

// Stories

export const fetchStories = async () => {
  const res = await fetch(`${BASE_URL}/stories`);
  return await res.json();
};

export const addStory = async (story) => {
  const res = await fetch(`${BASE_URL}/stories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(story),
  });
  return await res.json();
};
