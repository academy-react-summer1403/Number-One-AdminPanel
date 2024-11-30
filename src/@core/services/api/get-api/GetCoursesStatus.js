import toast from "react-hot-toast";
import http from "../../interceptor";

const GetCoursesStatus = async () => {
  try {
    const response = await http.get("/Status");
    return response;
  } catch {
    toast.error("مشکلی در دریافت  لیست وضعیت دوره ها  به وجود آمد!");
    return [];
  }
};

export default GetCoursesStatus;
