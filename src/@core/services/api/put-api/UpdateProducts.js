import toast from "react-hot-toast";
import axios from "axios";

const UpdateProducts = async (id, data, refetch) => {
  console.log(data)
  try {
    const response = await axios.put(
      `https://673cfd8a4db5a341d833a52f.mockapi.io/Products/${id}`,
      data
    );
    if (response) {
      toast.success("محصول با موفقیت ویرایش شد");
      if (refetch) {
        refetch();
      }
      return response;
    } else {
      toast.error("محصول ویرایش نشد!");
    }
  } catch (error) {
    toast.error("محصول ویرایش نشد!");
  }
};

export default UpdateProducts;
