import http from "../../interceptor";
import toast from "react-hot-toast";

const CreateCourseLevel = async (data, refetch) => {
  try {
    const response = await http.post("/CourseLevel", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.success) {
      toast.success(response.message);
      refetch();
    } else toast.error(response.message);
    return response;
  } catch (error) {
    toast.error(error.response.data.ErrorMessage)
    throw new Error(error.response.data.ErrorMessage);
  }
};

export default CreateCourseLevel;
