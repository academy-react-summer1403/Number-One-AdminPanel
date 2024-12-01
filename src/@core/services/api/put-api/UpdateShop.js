import toast from "react-hot-toast";
import http from "../../interceptor";
import axios from "axios";

const UpdateShop = async (id, values,refetch) => {
  console.log(id,values)
  try {
    const response = await axios.put(
      `https://6653aa591c6af63f46754aa6.mockapi.io//users/${id}`,
      values
    );
    toast.success("اطلاعات با موفقیت تغییر کرد");
    // return response;
    refetch && refetch();
  } catch (error) {
    toast.error("مشکلی در تغییر اطلاعات پیش آمده است");
  }
};

export default UpdateShop;
