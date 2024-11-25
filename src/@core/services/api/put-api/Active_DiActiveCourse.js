import toast from "react-hot-toast";
import http from "../../interceptor";

const ActiveOrDeActive = async (data,refetch) => {
  try {
    const result = await toast.promise(
      http.put("/Course/ActiveAndDeactiveCourse", data),
      {
        pending: "درحال ثبت شدن",
        success: "عملیات با موفقیت انجام شد",
        error: "لطفا دوباره تلاش کنید",
      }
    );
    if(result.success){
      refetch()
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default ActiveOrDeActive;
