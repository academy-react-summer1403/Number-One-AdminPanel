import axios from "axios";
import toast from "react-hot-toast";

const CreateEvents = async (values) => {
  try {
    const response = await axios.post(
      "https://67278458270bd0b97552ba83.mockapi.io/Events",
      values
    );
    toast.success("ایونت با موفقیت اضافه شد");
    return response;
  } catch (error) {
    toast.error("مشکلی پیش آمده است بعدا امتحان کنید");
  }
};

export default CreateEvents;
