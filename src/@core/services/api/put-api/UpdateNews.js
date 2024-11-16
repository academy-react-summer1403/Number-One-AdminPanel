import toast from "react-hot-toast";
import http from "../../interceptor";
import useFormData from "../../../../utility/hooks/useFormData";

const UpdateNews = async (data, refetch) => {
  try {
    const dataObj = useFormData(data);
    const response = await http.put("/News/UpdateNews", dataObj);
    if (response.success) {
      toast.success("خبر با موفقیت ویرایش شد !");
      refetch()
    } else toast.error(res.message);
  } catch {
    toast.error("مشکلی در ویرایش خبر به وجود آمد !");
  }
};

export default UpdateNews;
