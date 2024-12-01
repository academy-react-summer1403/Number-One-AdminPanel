import toast from "react-hot-toast";
import http from "../../interceptor";

const UpdateSocialGroup = async (form) => {
  // console.log(form)
  try {
    const result = await toast.promise(http.put("/CourseSocialGroup", form), {
      pending: "درحال ویرایش...",
    });
    if (result.success) toast.success(result.message);
    else toast.error(result.message);
    return result;
  } catch (error) {
    console.log(error);
    // return [];
    throw new Error(error.response.data.ErrorMessage[0]);
  }
};

export default UpdateSocialGroup;
