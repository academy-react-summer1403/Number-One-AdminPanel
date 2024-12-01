import toast from "react-hot-toast";
import http from "../../interceptor";

const AddTeacherMessage = async (id, msg) => {
  try {
    const response = await toast.promise(
      http.put(
        `https://673cfd8a4db5a341d833a52f.mockapi.io/Teacher-Support/${id}`,
        msg
      ),
      {
        error: "پیام شما ارسال نشد",
        loading: "در حال ارسال پیام...",
        success: "پیام شما با موفقیت ارسال شد",
      }
    );
    if (response) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

export default AddTeacherMessage;