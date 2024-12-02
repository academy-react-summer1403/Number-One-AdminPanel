import toast from "react-hot-toast";
import http from "../../interceptor";

const UpdateTerm = async (values, refetch) => {
  try {
    const response = await toast.promise(http.put("/Term", values), {
      error: "ترم ویرایش نشد",
      loading: "در حال ویرایش ترم...",
      success: "ترم با موفقیت ویرایش شد",
    });
    if (response.success) {
      refetch();
    }
  } catch (error) {
    console.log(error);
  }
};

export default UpdateTerm;
