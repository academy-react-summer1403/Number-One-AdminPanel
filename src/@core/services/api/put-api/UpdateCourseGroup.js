import toast from "react-hot-toast";
import http from "../../interceptor";
import useFormData from "../../../../utility/hooks/useFormData";

const UpdateCourseGroup = async (form) => {
  console.log(form)
  try {
    const dataObj = {
      Id: form.groupId,
      GroupName: form.value.GroupName,
      CourseId: form.id,
      GroupCapacity: form.value.GroupCapacity,
    };
    const formData = useFormData(dataObj);
    const result = await toast.promise(http.put("/CourseGroup", formData), {
      pending: "درحال ویرایش...",
      success: "گروه مورد نظر ویرایش شد",
      error: "لطفا دوباره تلاش کنید",
    });
    return result;
  } catch (error) {
    console.log(error);
    // return [];
    throw new Error(error.response.data.ErrorMessage[0]);
  }
};

export default UpdateCourseGroup;
