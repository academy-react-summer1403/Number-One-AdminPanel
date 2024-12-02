import toast from "react-hot-toast";
import http from "../../interceptor";

const UpdateCourseStatus = async (data, refetch) => {
  //   console.log(data);
  try {
    const response = await http.put("/Status", data);
    if (response.success) {
      //   toast.success("دسته بندی مورد نظر با موفقیت ویرایش شد !");
      toast.success(response.message);
      refetch && refetch();
    } else toast.error(response.message);
  } catch {
    toast.error("مشکلی در ویرایش وضعیت به وجود آمد !");
  }
};

export default UpdateCourseStatus;
