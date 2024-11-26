import toast from "react-hot-toast";
import http from "../../interceptor";

const ChangeReserve = async (data) => {
  try {
    const result = await toast.promise(
      http.post("/CourseReserve/SendReserveToCourse", data),
      {
        pending: "درحال ثبت...",
        success: "کاربر به گروه مورد نظر اضافه شد",
        error: "لطفا دوباره تلاش کنید!",
      }
      
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export default ChangeReserve;
