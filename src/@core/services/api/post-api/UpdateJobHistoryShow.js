import toast from "react-hot-toast";
import http from "../../interceptor";

const UpdateJobHistoryShow = async (params, refetch) => {
  try {
    const response = await toast.promise(
      http.post(
        `/SharePanel/HistoryToIndex?JobId=${params.JobId}&show=${params.show}`
      ),
      {
        error: "شغل کاربر ویرایش نشد",
        loading: "در حال ویرایش...",
        success: "اطلاعات با موفقیت ویرایش شد",
      }
    );
    if (response.success) {
      refetch();
    }
  } catch (error) {
    return;
  }
};

export default UpdateJobHistoryShow;
