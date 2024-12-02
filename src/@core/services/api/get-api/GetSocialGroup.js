import toast from "react-hot-toast";
import http from "../../interceptor";

const GetSocialGroup = async () => {
  try {
    const response = await http.get("/CourseSocialGroup");
    return response;
  } catch {
    toast.error("مشکلی در دریافت  لیست گروه های مجازی  به وجود آمد!");
    return [];
  }
};

export default GetSocialGroup;
