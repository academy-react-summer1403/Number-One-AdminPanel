import toast from "react-hot-toast";
import http from "../../interceptor";

const DeleteCourseReserve = async (id) => {
  try {
    const dataObj = {id:id}
    const result = await toast.promise(
      http.delete("/CourseReserve", {
        data: dataObj,
        headers: { "Content-Type": "application/json" },
      }),
      {
        pending: "درحال حذف",
        success: "با موفقیت حذف شد",
        error: "لطفا دوباره تلاش کنید!",
      }
    );
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default DeleteCourseReserve;
