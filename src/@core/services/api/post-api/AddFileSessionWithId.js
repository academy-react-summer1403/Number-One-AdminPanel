import toast from "react-hot-toast";
import http from "../../interceptor";

const AddFileSessionWithId = async (value) => {
  // console.log(value);
  try {
    const result = await toast.promise(
      http.post(`/Session/AddSessionFileWithUrl?SessionId=${value.SessionId}&Url=${value.Url}
        &FileName=${value.FileName}&FileFormat=${value.FileFormat}`),
      {
        loading: "درحال افزودن",
        success:"فایل جلسه اضافه شد"
      }
    );
    return result;
  } catch (error) {
    console.log(error);
    //   return [];
  }
};

export default AddFileSessionWithId;
