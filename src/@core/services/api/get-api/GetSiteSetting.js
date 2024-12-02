import toast from "react-hot-toast";
import http from "../../interceptor";

const GetSiteSetting = async (id) => {
  try {
    const response = await http.get(`/SiteSetting/${id}`);
    return response;
  } catch {
    toast.error("مشکلی در دریافت اطلاعات سایت به وجود اومد");
    return [];
  }
};

export default GetSiteSetting;
