import toast from "react-hot-toast";
import http from "../../interceptor";

const CreateCourseAssistance = async (values, refetch) => {
  try {
    const response = await toast.promise(
      http.post("/CourseAssistance", values),
      {
        error: "منتور اضافه نشد",
        loading: "در حال افزودن منتور",
        success: "منتور با موفقیت اظافه شد",
      }
    );
    if (response.success) {
      refetch();
    }
  } catch (error) {
    console.log(error);
  }
};

export default CreateCourseAssistance;
