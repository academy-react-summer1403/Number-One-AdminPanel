import axios from "axios";
import {
  useGetItem,
  useRemoveItem,
} from "../../../utility/hooks/useLocalStorage";

const baseURL = import.meta.env.VITE_BASE_URL;

const instance = axios.create({
  baseURL: baseURL,
});

const onSuccess = (response) => {
  return response.data;
};

const onError = (error) => {
  if (error.response && error.response.status === 422) {
    const errorMessage =
      error.response.data.ErrorMessage || "خطا: ورودی نامعتبر.";
    toast.error(errorMessage || "با خطا مواجه شدید");
  }
  if (error.response.status === 401) {
    toast.error(errorMessage || "ابتدا وارد حساب کاربری خود شوید");
    useRemoveItem("token");
  }
  if (error.response.status === 403) {
    const errorMessage =
      error.response.data.ErrorMessage || "خطا: ورودی نامعتبر.";
    toast.error(errorMessage || "با خطا مواجه شدید");
  }

  return Promise.reject(error);
};

instance.interceptors.response.use(onSuccess, onError);

instance.interceptors.request.use((opt) => {
  const token = useGetItem("token");

  if (token) opt.headers.Authorization = "Bearer " + token;
  return opt;
});

export default instance;
