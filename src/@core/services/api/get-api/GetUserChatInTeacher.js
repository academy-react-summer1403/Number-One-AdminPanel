import toast from "react-hot-toast";
import http from "../../interceptor";

const GetUserChatInTeacher = async () => {
  try {
    const response = await toast.promise(
      http.get(`https://673cfd8a4db5a341d833a52f.mockapi.io/Teacher-Support`),
      { error: "مشکلی در سرور به وجود آمده" }
    );
    return response;
  } catch (error) {
    return [];
  }
};

export default GetUserChatInTeacher;
