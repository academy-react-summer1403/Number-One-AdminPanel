import toast from "react-hot-toast";
import http from "../../interceptor";

const UpdateSchedule = async (id, data, refetch) => {
    // console.log(id,data);
  try {
    const response = await http.put(
      `/Schedual/UpdateSchedualSingle?currentCurseId=${id}`,
      data
    );
    if (response.success) {
      //   toast.success("دسته بندی مورد نظر با موفقیت ویرایش شد !");
      toast.success(response.message);
      refetch && refetch();
      return response;
    } else toast.error(response.message);
  } catch {
    toast.error("مشکلی پیش آمده لطفا دوباره تلاش کنید");
    // toast.error(new Error (error.response.data.ErrorMessage[0]));
    // throw new Error(error.response.data.ErrorMessage[0]);
  }
};

export default UpdateSchedule;
