import toast from "react-hot-toast";
import http from "../../interceptor";

const AddAdminMessage = async (id, msg) => {
  try {
    const response = await toast.promise(
      http.put(
        `https://6653aa591c6af63f46754aa6.mockapi.io/supoort/${id}`,
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

export default AddAdminMessage;
