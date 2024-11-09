import toast from "react-hot-toast";
import http from "../../interceptor";

const AddUserAccess = async (enable, roleId, userId) => {
  try {
    const response = await http.post(
      `/User/AddUserAccess`,
      { roleId, userId },
      { params: { Enable: enable } }
    );
    if (response.success) {
      toast.success("دسترسی با موفقیت تغییر کرد !");
    } else {
      toast.error("مشکلی در تغییر دسترسی به وجود آمد !");
    }
    return response;
  } catch (error) {
    toast.error("مشکلی در تغییر دسترسی به وجود آمد !");
    return false;
  }
};

export default AddUserAccess;
