import toast from "react-hot-toast";
import http from "../../interceptor";

const GetCourseLevels = async () => {
  try {
    const response = await http.get("/CourseLevel/GetAllCourseLevel");
    return response;
  } catch {
    toast.error("مشکلی در دریافت  لیست سطوح دوره ها  به وجود آمد!");
    return [];
  }
};

export default GetCourseLevels;
