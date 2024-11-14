import toast from "react-hot-toast";
import http from "../../interceptor";

const AcceptUserComment = async (id, refetch) => {
  try {
    const response = await http.post(
      `/Course/AcceptCourseComment?CommentCourseId=${id}`
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

export default AcceptUserComment;
