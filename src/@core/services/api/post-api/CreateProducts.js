import toast from "react-hot-toast";
import axios from "axios";

const CreateProducts = async (values) => {
  try {
    const params = {
      title: values.title,
      categoryId: values.categoryId,
      discribe: values.discribe,
      pictureList: values.pictureList,
      exist: values.exist,
      price: values.price,
      isActive: values.isActive,
      shopId: values.shopId,
      insertDate: values.insertDate,
      discount: values.discount,
      miniDiscribe: values.miniDiscribe,
      googleDiscribe: values.googleDiscribe,
      googleTitle: values.googleTitle,
    };
    const response = await toast.promise(
      axios.post(
        "https://673cfd8a4db5a341d833a52f.mockapi.io/Products",
        params
      ),
      {
        error: "محصول ساخته نشد!",
        loading: "در حال ساخت محصول...",
        success: "محصول ساخته شده",
      }
    );
    return response;
  } catch (error) {
    return false;
  }
};

export default CreateProducts;
