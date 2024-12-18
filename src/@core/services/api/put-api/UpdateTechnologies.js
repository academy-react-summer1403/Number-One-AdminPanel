import toast from "react-hot-toast";
import http from "../../interceptor";

const UpdateTechnologies = async (data, refetch) => {
  //   console.log(data);
  try {
    const response = await http.put("/Technology", data);
    if (response.success) {
      //   toast.success("دسته بندی مورد نظر با موفقیت ویرایش شد !");
      toast.success(response.message);
      refetch && refetch();
    } else toast.error(response.message);
  } catch {
    toast.error("مشکلی در ویرایش خبر به وجود آمد !");
  }
};

export default UpdateTechnologies;
