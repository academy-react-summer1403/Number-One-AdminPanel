import toast from "react-hot-toast";
import axios from "axios";

const UpdateEvent = async (id, values) => {
  try {
    const response = await axios.put(
      `https://67278458270bd0b97552ba83.mockapi.io/Events/${id}`,
      values
    );
    toast.success("اطلاعات با موفقیت تغییر کرد");
    return response;
  } catch (error) {
    toast.success("مشکلی در تغییر اطلاعات پیش آمده است");
  }
};

export default UpdateEvent;
