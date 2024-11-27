import toast from "react-hot-toast";
import http from "../../interceptor";

const CreateShop = async (values) => {
  console.log(values)
  try {
    const response = await http.post(
      "https://6653aa591c6af63f46754aa6.mockapi.io/users",
      values
    );
    toast.success("فروشگاه با موفقیت اضافه شد");
    return response;
  } catch (error) {
    toast.error("مشکلی پیش آمده است بعدا امتحان کنید");
  }
};

export default CreateShop;
