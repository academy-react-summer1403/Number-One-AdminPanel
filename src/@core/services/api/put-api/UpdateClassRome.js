import toast from "react-hot-toast";
import http from "../../interceptor";

const UpdateClassRome = async (values, refetch) => {
  try {
    const response = await toast.promise(http.put("/ClassRoom", values), {
      error: "کلاس ویرایش نشد",
      loading: "در حال ویرایش کلاس...",
      success: "کلاس با موفقیت ویرایش شد",
    });

    if (response.success) {
      refetch();
    }
  } catch (error) {
    console.log(error);
  }
};

export default UpdateClassRome;
