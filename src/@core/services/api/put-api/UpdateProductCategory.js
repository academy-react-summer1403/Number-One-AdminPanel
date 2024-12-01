import toast from "react-hot-toast";
import axios from "axios";

const UpdateProductCategory = async (id,values,refetch) => {
//   console.log(id,values)
  try {
    const response = await axios.put(
      `https://67448500b4e2e04abea28bf5.mockapi.io/Product-Category/${id}`,
      values
    );
    toast.success("اطلاعات دسته بندی با موفقیت تغییر کرد");
    // return response;
    refetch && refetch();
  } catch (error) {
    toast.error("مشکلی در تغییر اطلاعات پیش آمده است");
  }
};

export default UpdateProductCategory;
