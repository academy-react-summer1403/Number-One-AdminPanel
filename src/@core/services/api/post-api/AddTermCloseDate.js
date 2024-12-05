import toast from "react-hot-toast";
import http from "../../interceptor";

const AddTermCloseDate = async (values, refetch) => {
    console.log(values)
  try {
    const response = await toast.promise(
      http.post("/Term/AddTermCloseDate", values),
      {
        error: "اطلاعات ثبت نشد",
        loading: "در حال ثبت اطلاعات...",
        success: "اطلاعات با موفقیت ثبت شد",
      }
    );
    if (response.success) {
      refetch();
    }
  } catch (error) {
    return;
  }
};

export default AddTermCloseDate;
