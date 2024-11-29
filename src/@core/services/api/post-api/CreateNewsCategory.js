import http from "../../interceptor";
import useFormData from "../../../../utility/hooks/useFormData";
import toast from "react-hot-toast";

const CreateNewsCategory = async (data,refetch) => {
  try {
    const dataObj = useFormData(data);
    const response = await http.post("/News/CreateNewsCategory", dataObj, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.success) {
      toast.success(response.message);
      refetch()
    } else toast.error(response.message);
    return response;
  } catch (error) {
    throw new Error(error.response.data.ErrorMessage);
  }
};

export default CreateNewsCategory;
