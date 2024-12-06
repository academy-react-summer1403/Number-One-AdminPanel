import toast from "react-hot-toast";
import http from "../../interceptor";

const UpdateUser = async (user, refetch) => {
  try {
    const response = await toast.promise(http.put("/User/UpdateUser", user), {
      error: "اطلاعات ویرایش نشد",
      loading: "در حال ویرایش...",
      success: "اطلاعات با موفقیت ویرایش شد"
    });
    if (response.success) {
      refetch();
    }
    return response;
  } catch {
    return [];
  }
};

export default UpdateUser;
