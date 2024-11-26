import toast from "react-hot-toast";
import http from "../../interceptor";

const DeleteCourseComment = async (id) => {
    try {
      const result = await toast.promise(http.delete(
        `/Course/DeleteCourseComment?CourseCommandId=${id}`
      ),
    {
      pending:"در حال حذف...",
      success:"کامنت مورد نظر حذف شد",
      error:"دوره تایید شده!!"
    }
  );
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  export default DeleteCourseComment