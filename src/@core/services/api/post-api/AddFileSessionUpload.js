import toast from "react-hot-toast";
import http from "../../interceptor";
import useFormData from "../../../../utility/hooks/useFormData";

const AddFileSessionUpload = async (value) => {
  // console.log(value);
  try {
    const formData = useFormData(value);
    const result = await toast.promise(
      http.post("/Session/AddSessionFile", formData),
      {
        loading: "درحال افزودن",
      }
    );
    return result;
  } catch (error) {
    console.log(error);
    //   return [];
  }
};

export default AddFileSessionUpload;
