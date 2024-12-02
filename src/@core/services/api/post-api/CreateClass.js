import toast from "react-hot-toast";
import http from "../../interceptor";

const CreateClassRome = async (values, refetch) => {
  try {
    const response = await toast.promise(http.post("/ClassRoom", values), {
      error: "کلاس ساخته نشد",
      loading: "در حال ساختن کلاس...",
      success: "کلاس با موفقیت ساخته شد",
    });
    if (response.success) {
      refetch();
    }
  } catch (error) {
    console.log(error);
  }
};

export default CreateClassRome;
