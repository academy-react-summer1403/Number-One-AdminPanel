import toast from "react-hot-toast";
import http from "../../interceptor";
import useFormData from "../../../../utility/hooks/useFormData";

const AcceptCoursePayment = async (id, refetch) => {
  // console.log(id)
  try {
    const formId = useFormData({ PaymentId: id });
    console.log(formId)
    const response = await toast.promise(
      http.put("/CoursePayment/Accept", formId),
      {
        pending: " در حال تایید...",
        success: "پرداختی مورد نظر تایید شد",
        error: "مشکلی پیش آمده لطفا دوباره تلاش کنید",
      }
    );

    if (response.success) {
      refetch();
    } else {
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default AcceptCoursePayment;
