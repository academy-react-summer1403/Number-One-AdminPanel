import toast from "react-hot-toast";
import axios from "axios";

const UpdateEvent = async (id, values, refetch) => {
  try {
    const response = await axios.put(
      `https://67278458270bd0b97552ba83.mockapi.io/Events/${id}`,
      values
    );
    if (response) {
      toast.success("اطلاعات با موفقیت تغییر کرد");
      refetch();
    } else {
      toast.error("مشکلی در تغییر اطلاعات پیش آمده است");
    }
  } catch (error) {
    toast.error("مشکلی در تغییر اطلاعات پیش آمده است");
  }
};

export default UpdateEvent;
