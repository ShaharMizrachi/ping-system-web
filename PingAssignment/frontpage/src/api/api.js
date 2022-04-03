import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/",
  validateStatus: (s) => true,
  headers: {
    "Content-Type": "application/json;",
  },
});

export const pingRequest = async (hostname, count) => {
  try {
    const { data } = await api.get(`/ping?hostname=${hostname}&count=${count}`);
    return data;
  } catch (error) {
    return { success: false, message: JSON.stringify(error) };
  }
};

export const getTop5 = async () => {
  try {
    const { data } = await api.get("/top5");
    return data;
  } catch (error) {
    return { success: false, message: JSON.stringify(error) };
  }
};
