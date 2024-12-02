import toast from "react-hot-toast";
import http from "../../interceptor";

const CreateNewTerm = async (values, refetch) => {
  try {
    const response = await toast.promise(http.post("/Term", values), {
      error: "ترم ساخته نشد",
      loading: "در حال ساختن ترم...",
      success: "ترم با موفقیت ساخته شد",
    });
    if (response.success) {
      refetch();
    }
  } catch (error) {
    console.log(error);
  }
};

export default CreateNewTerm;
