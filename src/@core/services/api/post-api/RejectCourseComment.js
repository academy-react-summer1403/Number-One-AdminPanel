import toast from "react-hot-toast";
import http from "../../interceptor";

const RejectCourseComment = async (id) => {
  try {
    const result = await toast.promise(
      http.post(`/Course/RejectCourseComment?CommentCourseId=${id}`),
      {
        pending: "در حال ثبت...",
        success: "کامنت مورد نظر رد شد",
        error: "دوباره تلاش کنید",
      }
    );
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default RejectCourseComment;
