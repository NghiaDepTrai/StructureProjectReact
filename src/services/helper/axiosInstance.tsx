import axios from "axios";
export default (history = null) => {
  const baseURL = process.env.NODE_ENV;
  const headers = {
    Authorization: "",
  };
  if (localStorage.token) {
    headers.Authorization = `Bearer ${localStorage.token}`;
  }
  const axiosInstance = axios.create({
    baseURL,
    headers,
  });
  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      if (error?.response?.status === 401) {
        history.push("/login");
      }
    }
  );
  axiosInstance.interceptors.request.use(
    async (config) => {
      return config;
    },
    (err) => Promise.reject(err)
  );
  return axiosInstance;
};
