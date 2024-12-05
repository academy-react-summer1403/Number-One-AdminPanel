import axios from "axios";
import {
  useGetItem,
  useRemoveItem,
} from "../../../utility/hooks/useLocalStorage";
import toast from "react-hot-toast";

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
    toast.error(errorMessage?.[0] || "با خطا مواجه شدید");
  } else if (error.response.status === 401) {
    toast.error("ابتدا وارد حساب کاربری خود شوید");
    useRemoveItem("token");
  } else if (error.response.status === 403) {
    const errorMessage =
      error.response.data.ErrorMessage || "خطا: ورودی نامعتبر.";
    toast.error(errorMessage?.[0] || "با خطا مواجه شدید");
  } else {
    const errorMessage = error.response.data.ErrorMessage;
    toast.error(errorMessage?.[0]);
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
