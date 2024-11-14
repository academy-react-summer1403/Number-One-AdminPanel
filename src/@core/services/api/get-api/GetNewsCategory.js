import toast from "react-hot-toast";
import http from "../../interceptor";

const GetNewsCategory = async () => {
  try {
    const response = await http.get(`/News/GetListNewsCategory`);
    return response;
  } catch {
    toast.error("مشکلی در دریافت دسته بندی های اخبار به وجود آمد!");
    return [];
  }
};

export default GetNewsCategory;
