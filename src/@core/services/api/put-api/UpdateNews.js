import toast from "react-hot-toast";
import http from "../../interceptor";
import useFormData from "../../../../utility/hooks/form-data";

const UpdateNews = async (data) => {
  try {
    const dataObj = useFormData(data);
    console.log(dataObj)
    const response = await http.put("/News/UpdateNews", dataObj);
    if (response.success) {
      toast.success("خبر با موفقیت ویرایش شد !");
    } else toast.error(res.message);
  } catch {
    toast.error("مشکلی در ویرایش خبر به وجود آمد !");
  }
};

export default UpdateNews;
