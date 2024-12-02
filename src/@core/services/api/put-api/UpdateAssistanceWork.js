import toast from "react-hot-toast";
import http from "../../interceptor";

const UpdateAssistanceWork = async (values, refetch) => {
  try {
    const response = await toast.promise(http.put("/AssistanceWork", values), {
      error: "تسک ویرایش نشد",
      loading: "در حال ویرایش تسک...",
      success: "تسک با موفقیت ویرایش شد",
    });
    if (response.success) {
      refetch();
    }
  } catch (error) {
    console.log(error);
  }
};

export default UpdateAssistanceWork;
