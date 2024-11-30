import toast from "react-hot-toast";
import http from "../../interceptor";

const CreateNewDepartment = async (values, refetch) => {
  try {
    const response = await toast.promise(http.post("/Department", values), {
      error: "بخش ساخته نشد",
      loading: "در حال ساختن بخش...",
      success: "بخش با موفقیت ساخته شد",
    });
    if (response.success) {
      refetch();
    }
  } catch (error) {
    console.log(error);
  }
};

export default CreateNewDepartment
