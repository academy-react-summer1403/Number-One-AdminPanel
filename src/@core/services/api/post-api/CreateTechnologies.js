import http from "../../interceptor";
import toast from "react-hot-toast";

const CreateTechnologies = async (data,refetch) => {
  try {
    const response = await http.post("/Technology", data, {
      headers: {
        "Content-Type": "application/json",
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

export default CreateTechnologies;
