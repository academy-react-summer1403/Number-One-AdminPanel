import toast from "react-hot-toast";
import http from "../../interceptor";
import useFormData from "../../../../utility/hooks/useFormData";

const AddCourseGroupe = async (form) => {
  try {
    const dataObj = {
      GroupName: form.value.GroupName,
      CourseId: form.id,
      GroupCapacity: form.value.GroupCapacity,
    };
    const formData = useFormData(dataObj);
    const result = await toast.promise(http.post("/CourseGroup", formData), {
      pending: "درحال افزودن...",
      success: "گروه جدید ایجاد شد",
      error: "لطفا دوباره تلاش کنید",
    });
    return result;
  } catch (error) {
    console.log(error);
    // return [];
    throw new Error(error.response.data.ErrorMessage[0]);
  }
};

export default AddCourseGroupe;
