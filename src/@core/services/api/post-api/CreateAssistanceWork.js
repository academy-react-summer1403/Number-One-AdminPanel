import toast from "react-hot-toast";
import http from "../../interceptor";

const CreateAssistanceWork = async (values, refetch) => {
  try {
    const response = await toast.promise(http.post("/AssistanceWork", values), {
      error: "تسک ساخته نشد",
      loading: "در حال ساخت تسک...",
      success: "تسک ساخته با موفقیت ساخته شد",
    });
    if (response.success) {
      refetch();
    }
  } catch (error) {
    console.log(error);
  }
};

export default CreateAssistanceWork;
