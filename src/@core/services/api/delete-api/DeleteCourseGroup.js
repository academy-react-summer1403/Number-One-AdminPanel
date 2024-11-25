import toast from "react-hot-toast";
import http from "../../interceptor";
import useFormData from "../../../../utility/hooks/useFormData";

const DeleteCourseGroup = async (id) => {
  try {
    const paramsId = useFormData({ id: id });
    const result = await toast.promise(
      http.delete("/CourseGroup", {
        data: paramsId,
        headers: { "Content-Type": "multipart/form-data" },
      }),
      {
        pending: "درحال حذف",
        success: "دوره مورد نظر حذف شد",
        error: "لطفا دوباره تلاش کنید!",
      }
    );
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default DeleteCourseGroup;
