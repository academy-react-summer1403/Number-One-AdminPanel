import toast from "react-hot-toast";
import http from "../../interceptor";

const AddSession = async (values, refetch) => {
  try {
    const response = await toast.promise(
      http.post("/Session/AddSession", values),
      {
        error: "جلسه ساخته نشد",
        loading: "در حال ساختن جلسه...",
        success: "جلسه با موفقیت ساخته شد",
      }
    );
    if (response.success) {
      refetch();
    }
  } catch (error) {
    return;
  }
};

export default AddSession;
