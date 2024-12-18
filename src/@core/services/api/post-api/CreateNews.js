import http from "../../interceptor";
import useFormData from "../../../../utility/hooks/useFormData"
import toast from "react-hot-toast";

const CreateNews = async (data) => {
  try {
    const dataObj = useFormData(data);
    const response = await http.post("/News/CreateNews", dataObj, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.success) {
      toast.success(response.message);
    } else toast.error(response.message);
  } catch (error) {
    throw new Error(error.response.data.ErrorMessage);
  }
};

export default CreateNews;
