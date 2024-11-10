import toast from "react-hot-toast";
import http from "../../interceptor";

const RejectUserComment = async (id) => {
  try {
    const response = await http.post(
      `/Course/RejectCourseComment?CommentCourseId=${id}`
    );
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  } catch (error) {
    return [];
  }
};

export default RejectUserComment;
