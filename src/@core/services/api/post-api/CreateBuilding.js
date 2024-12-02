import toast from "react-hot-toast";
import http from "../../interceptor";

const CreateNewBuilding = async (values, refetch) => {
  try {
    const response = await toast.promise(http.post("/Building", values), {
      error: "ساختمان ساخته نشد",
      loading: "در حال ساخت ساختمان...",
      success: "ساختمان با موفقیت سخته شد",
    });
    if (response.success) {
      refetch();
    }
  } catch (error) {
    console.log(error);
  }
};

export default CreateNewBuilding;
