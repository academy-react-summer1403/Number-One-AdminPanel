import toast from "react-hot-toast";
import http from "../../interceptor";

const UpdateDepartment = async (values, refetch) => {
  try {
    const response = await toast.promise(http.put("/Department", values), {
      error: "بخش ویرایش نشد",
      loading: "در حال ویرایش بخش...",
      success: "بخش با موفقیت ویرایش شد",
    });

    if (response.success) {
      refetch();
    }
  } catch (error) {
    console.log(error);
  }
};

export default UpdateDepartment;
