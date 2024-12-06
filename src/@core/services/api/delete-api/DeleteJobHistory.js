import toast from "react-hot-toast";
import http from "../../interceptor";

const DeleteJobHistory = async (id, refetch) => {
  try {
    const response = await toast.promise(
      http.delete(`/SharePanel/DeleteJobHistory?HistoryId=${id}`),
      {
        error: "رزومه حذف نشد",
        loading: "در حال حذف رزومه...",
        success: "رزومه با موفقیت حذف شد"
      }
    );
    if (response.success) {
      refetch();
    }
  } catch (error) {
    return;
  }
};

export default DeleteJobHistory;
