import toast from "react-hot-toast";
import http from "../../interceptor";
import useFormData from "../../../../utility/hooks/useFormData";

const UpdateNewsCategory = async (data, refetch) => {
//   console.log(data);
  try {
    const dataObj = useFormData(data);
    const response = await http.put("/News/UpdateNewsCategory", dataObj);
    if (response.success) {
      //   toast.success("دسته بندی مورد نظر با موفقیت ویرایش شد !");
      toast.success(response.message);
      refetch();
    } else toast.error(response.message);
  } catch {
    toast.error("مشکلی در ویرایش خبر به وجود آمد !");
  }
};

export default UpdateNewsCategory;
