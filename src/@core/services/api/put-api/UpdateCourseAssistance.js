import toast from "react-hot-toast";
import http from "../../interceptor";

const UpdateCourseAssistance = async (values, refetch) => {
  try {
    const response = await toast.promise(
      http.put("/CourseAssistance", values),
      {
        error: "اطلاعات ویرایش نشد",
        loading: "در حال ویرایش اطلاعات...",
        success: "اطلاعات با موفقیت ویرایش شد",
      }
    );
    if (response.success) {
      refetch();
    }
  } catch (error) {
    console.log(error);
  }
};

export default UpdateCourseAssistance;
