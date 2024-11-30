import toast from "react-hot-toast";
import http from "../../interceptor";

const UpdateCourseLevel = async (data, refetch) => {
  //   console.log(data);
  try {
    const response = await http.put("/CourseLevel", data);
    if (response.success) {
      //   toast.success("دسته بندی مورد نظر با موفقیت ویرایش شد !");
      toast.success(response.message);
      refetch && refetch();
    } else toast.error(response.message);
  } catch {
    toast.error(error.response.data.ErrorMessage)
    // toast.error("مشکلی در ویرایش سطح به وجود آمد !");
  }
};

export default UpdateCourseLevel;
