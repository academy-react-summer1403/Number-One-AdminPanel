import toast from "react-hot-toast";
import http from "../../interceptor";

const AddSocialGroup = async (form) => {
  // console.log(form)
  try {
    const result = await toast.promise(http.post("/CourseSocialGroup", form), {
      pending: "درحال افزودن...",
    });
    if (result.success) toast.success(result.message);
    else toast.error(result.message);
    console.log(result)
    return result;
  } catch (error) {
    console.log(error);
    // return [];
    throw new Error(error.response.data.ErrorMessage[0]);
  }
};

export default AddSocialGroup;
