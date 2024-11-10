import axios from "axios";
import { getItem, removeItem } from "../../../utility/hooks/useLocalStorage";

const baseURL = import.meta.env.VITE_BASE_URL;

const instance = axios.create({
  baseURL: baseURL,
});

const onSuccess = (response) => {
  return response.data;
};

const onError = (err) => {
  if (err.response.status === 401) {
    removeItem("token");
    window.location.pathname = "/";
  }

  return Promise.reject(err);
};

instance.interceptors.response.use(onSuccess, onError);

instance.interceptors.request.use((opt) => {
  const token = getItem("token");

  if (token) opt.headers.Authorization = "Bearer " + token;
  return opt;
});

export default instance;
