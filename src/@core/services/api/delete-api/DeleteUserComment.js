import toast from "react-hot-toast";
import http from "../../interceptor";

const DeleteUserComment = async (id, refetch) => {
  try {
    const response = await http.delete(
      `/Course/DeleteCourseComment?CourseCommandId=${id}`
    );
    if (response.success) {
      toast.success(response.message);
      refetch();
    } else {
      toast.error(response.message);
    }
  } catch (error) {
    throw new Error(error.response.data.ErrorMessage[0]);
  }
};

export default DeleteUserComment;
