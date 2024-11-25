import toast from "react-hot-toast";
import http from "../../interceptor";
import useFormData from "../../../../utility/hooks/useFormData";

const UpdateCourse = async (form) => {
  console.log(form)
  try {
    const formData = useFormData(form)
    const result = await toast.promise(http.put("/Course", formData), {
      pending: "در حال ویرایش",
      success: "دوره ویرایش شد",
      error: "لطفا دوباره تلاش کنید",
    });
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default UpdateCourse;
