import toast from "react-hot-toast";
import http from "../../interceptor";

const GetUserChatInAdmin = async () => {
  try {
    const request = await toast.promise(
      http.get(`https://6653aa591c6af63f46754aa6.mockapi.io/supoort`),
      { error: "مشکلی در سرور به وجود آمده" }
    );

    return request;
  } catch (error) {
    return [];
  }
};

export default GetUserChatInAdmin;
