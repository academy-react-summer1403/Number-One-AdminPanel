import toast from "react-hot-toast";
import http from "../../interceptor";
import useFormData from "../../../../utility/hooks/useFormData";

const CreateCourse = async (value) => {
  try {
    const formData = useFormData(value);
    const result = await toast.promise(http.post("/Course", formData), {
      pending: "درحال افزودن",
      success: "دوره با موفقیت اضافه شد",
      error: "دوره اضافه نشد لطفا دوباره تلاش کنید",
    });
    return result;
  } catch (error) {
    console.log(error);
    //   return [];
  }
};

export default CreateCourse;
