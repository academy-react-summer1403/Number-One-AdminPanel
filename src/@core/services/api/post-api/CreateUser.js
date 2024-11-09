import toast from "react-hot-toast";
import http from "../../interceptor";

const CreateUser = async (user) => {
  try {
    const response = await http.post("/User/CreateUser", user);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  } catch (error) {
    if (error.response.status == 422) {
      error.response.data.ErrorMessage.map((item) => toast.error(item));
    } else {
      toast.error("مشکلی پیش آمده است");
    }
  }
};

export default CreateUser;
