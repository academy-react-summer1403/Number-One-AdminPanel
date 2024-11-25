import toast from "react-hot-toast";
import http from "../../interceptor";
import useFormData from "../../../../utility/hooks/useFormData";

const DeleteCoursePayment = async (id, refetch) => {
  try {
    const formId = useFormData({ PaymentId: id });

    const response = await toast.promise(
      http.delete(`/CoursePayment`, {
        data: formId,
        headers: { "Content-Type": "multipart/form-data" },
      }),
      {
        pending: "درحال حذف شدن...",
        success: "پرداختی دوره با موفقیت حذف شد",
        error: "لطفا دوباره تلاش کنید",
      }
    );
    if (response.success) {
      refetch();
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default DeleteCoursePayment;
