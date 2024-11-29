import toast from "react-hot-toast";
import http from "../../interceptor";

const UpdateBuilding = async (data, refetch) => {
  try {
    const response = await toast.promise(http.put("/Building", data), {
      pending: "در حال ویرایش",
      success: "ساختمان ویرایش شد",
      error: "لطفا دوباره تلاش کنید",
    });
    if (response.success) {
      refetch();
    }
  } catch (error) {
    console.log(error);
  }
};

export default UpdateBuilding;
