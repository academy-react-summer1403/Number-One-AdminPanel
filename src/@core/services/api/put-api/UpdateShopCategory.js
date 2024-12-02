import toast from "react-hot-toast";
import axios from "axios";

const UpdateShopCategory = async (id,values,refetch) => {
//   console.log(id,values)
  try {
    const response = await axios.put(
      `https://6747054d38c8741641d5120e.mockapi.io/shop_Categories/${id}`,
      values
    );
    toast.success("اطلاعات دسته بندی با موفقیت تغییر کرد");
    // return response;
    refetch && refetch();
  } catch (error) {
    toast.error("مشکلی در تغییر اطلاعات پیش آمده است");
  }
};

export default UpdateShopCategory;
