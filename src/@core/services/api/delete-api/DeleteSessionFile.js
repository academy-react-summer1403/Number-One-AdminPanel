import toast from "react-hot-toast";
import http from "../../interceptor";

const DeleteSessionFile = async (id) => {
  try {
    const result = await toast.promise(
      http.delete("/Session/DeleteSessionFile", {
        data: id,
        headers: { "Content-Type": "application/json" },
      }),
      {
        loading: "درحال حذف",
        success: "فایل مورد نظر حذف شد",
        error: "خطا از سمت سرور",
      }
    );
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default DeleteSessionFile;
