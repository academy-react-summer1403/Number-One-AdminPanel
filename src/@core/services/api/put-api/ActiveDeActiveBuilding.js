import toast from "react-hot-toast";
import http from "../../interceptor";

const ActiveDeActiveBuilding = async (data, refetch) => {
  try {
    const response = await toast.promise(http.put("/Building/Active", data), {
      pending: "درحال ثبت شدن",
      success: "عملیات با موفقیت انجام شد",
      error: "لطفا دوباره تلاش کنید",
    });
    if (response.success) {
      refetch();
    }
  } catch (error) {
    console.log(error);
  }
};

export default ActiveDeActiveBuilding
