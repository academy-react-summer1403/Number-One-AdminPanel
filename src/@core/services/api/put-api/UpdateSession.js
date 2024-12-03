import toast from "react-hot-toast";
import http from "../../interceptor";

const UpdateSession = async (values, refetch) => {
  try {
    const response = await toast.promise(
      http.put("/Session/UpdateSession", values),
      {
        error: "جلسه ویرایش نشد",
        loading: "در حال ویرایش جلسه...",
        success: "جلسه با موفقیت ویرایش شد",
      }
    );
    if (response.success) {
      refetch();
    }
  } catch (error) {
    return;
  }
};

export default UpdateSession;
