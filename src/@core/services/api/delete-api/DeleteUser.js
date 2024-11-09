import toast from "react-hot-toast";
import http from "../../interceptor";

const DeleteUser = async (id) => {
  try {
    const response = await http.delete("/User/DeleteUser", {
      data: { userId: id },
    });
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  } catch (error) {
    if (error.response.status == 422 || error.response.status == 415) {
      error.response.data.ErrorMessage.map((item) => toast.error(item));
    }
  }
};

export default DeleteUser;
