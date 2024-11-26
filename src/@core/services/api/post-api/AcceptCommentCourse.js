import toast from "react-hot-toast";
import http from "../../interceptor";

const AcceptCommentCourse = async (id) => {
  try {
    const result = await toast.promise(
      http.post(`/Course/AcceptCourseComment?CommentCourseId=${id}`),
      {
        pending: "در حال ثبت...",
        success: "کامنت مورد نظر ثبت شد",
        error: "دوباره تلاش کنید",
      }
    );
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default AcceptCommentCourse;
