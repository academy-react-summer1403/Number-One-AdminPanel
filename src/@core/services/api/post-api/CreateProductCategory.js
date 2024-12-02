import toast from "react-hot-toast";
import axios from "axios";

const CreateProductCategory = async (values, refetch) => {
  //   console.log(values);
  try {
    const response = await axios.post(
      "https://67448500b4e2e04abea28bf5.mockapi.io/Product-Category",
      values
    );
    toast.success("دسته بندی با موفقیت اضافه شد");
    refetch();
    return response;
  } catch (error) {
    toast.error("مشکلی پیش آمده است بعدا امتحان کنید");
  }
};

export default CreateProductCategory;
