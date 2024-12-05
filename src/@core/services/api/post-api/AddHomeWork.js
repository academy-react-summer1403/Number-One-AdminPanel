import toast from "react-hot-toast";
import http from "../../interceptor";

const AddHomeWork = async (values, refetch) => {
  try {
    const response = await toast.promise(
      http.post("/Session/AddSessionHomeWork", values),
      {
        error: "تکلیف ساخته نشد",
        loading: "در حال ساخت تکلیف...",
        success: "تکلیف با موفقیت ساخته شد",
      }
    );
    if (response.success) {
      refetch();
    }
  } catch (error) {
    console.log(error);
  }
};

export default AddHomeWork
