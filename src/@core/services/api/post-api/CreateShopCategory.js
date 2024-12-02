import toast from "react-hot-toast";
import axios from "axios";

const CreateShopCategory = async (values, refetch) => {
//   console.log(values);
  try {
    const response = await axios.post(
      "https://6747054d38c8741641d5120e.mockapi.io/shop_Categories",
      values
    );
    toast.success("دسته بندی با موفقیت اضافه شد");
    refetch();
    return response;
  } catch (error) {
    toast.error("مشکلی پیش آمده است بعدا امتحان کنید");
  }
};

export default CreateShopCategory;
