import http from "../../interceptor";
import toast from "react-hot-toast";

const CreateCourseStatus = async (data, refetch) => {
  // console.log(data) 
  try {
    const response = await http.post("/Status", data, {
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
    throw new Error(error.response.data.ErrorMessage);
  }
};

export default CreateCourseStatus;
