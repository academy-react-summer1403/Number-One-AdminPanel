import http from "../../interceptor";
import toast from "react-hot-toast";

const CreateScheduleAuto = async (id, data, refetch) => {
  alert()
  // console.log(id,data)
  try {
    const response = await http.post(
      `/Schedual/AddSchedualAutomatic?currentCurseId=${id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.success) {
      toast.success(response.message);
      refetch();
    } else toast.error(response.message);
    return response;
  } catch (error) {
    toast.error(error.response.data.ErrorMessage);
    throw new Error(error.response.data.ErrorMessage);
  }
};

export default CreateScheduleAuto;
