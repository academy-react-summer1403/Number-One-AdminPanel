import toast from "react-hot-toast";
import http from "../../interceptor";
import useFormData from "../../../../utility/hooks/useFormData";

const ChangeCourseStatus = async (id, statusId) => {
  // console.log(id)
  try {
    const form = useFormData({ CourseId: id, StatusId: statusId });
    console.log(form);
    const response = await toast.promise(
      http.put("/Course/UpdateCourseStatus", form),
      {
        pending: " در حال تغییر وضعیت...",
        success: "وضعیت دوره با موفقیت تغییر کرد",
        error: "مشکلی پیش آمده لطفا دوباره تلاش کنید",
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default ChangeCourseStatus;
