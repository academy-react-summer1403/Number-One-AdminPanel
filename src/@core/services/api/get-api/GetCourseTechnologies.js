import toast from "react-hot-toast";
import http from "../../interceptor";

const GetCourseTechnologies = async () => {
  try {
    const response = await http.get("/Technology");
    return response;
  } catch {
    toast.error("مشکلی در دریافت دسته بندی های اخبار به وجود آمد!");
    return [];
  }
};

export default GetCourseTechnologies;
