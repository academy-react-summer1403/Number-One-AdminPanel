import toast from "react-hot-toast";
import http from "../../interceptor";

const AddTechnologies = async (courseId, Techs) => {
  // console.log(courseId,Techs)
  if (courseId === "") toast.error("آیدی دوره وجود ندارد");
  if (Techs.length == 0) toast.error("تکنولوژی دوره را انتخاب کنید");
  try {
    const result = await toast.promise(
      http.post(`/Course/AddCourseTechnology?courseId=${courseId}`, Techs),
      {
        pending: "درحال ثبت...",
        success: "با موفقیت انجام شد",
        error: "لطفا دوباره تلاش کنید",
      }
    );
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export default AddTechnologies;
