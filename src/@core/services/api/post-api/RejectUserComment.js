import toast from "react-hot-toast";
import http from "../../interceptor";

const RejectUserComment = async (id, refetch) => {
  try {
    const response = await http.post(
      `/Course/RejectCourseComment?CommentCourseId=${id}`
    );
    if (response.success) {
      toast.success(response.message);
      refetch();
    } else {
      toast.error(response.message);
    }
  } catch (error) {
    return [];
  }
};

export default RejectUserComment;
