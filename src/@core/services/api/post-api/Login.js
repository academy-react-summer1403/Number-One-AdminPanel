import toast from "react-hot-toast";
import http from "../../interceptor";
import { useSetItem } from "../../../../utility/hooks/useLocalStorage";

const LoginUser = async (user, navigate) => {
  try {
    const response = await toast.promise(http.post("/Sign/Login", user), {
      loading: "در حال پردازش...",
    });

    if (response.token) {
      useSetItem("token", response.token);
      useSetItem("id", response.id);
      navigate("/home");
      toast.success("عملیات با موفقیت انجام شد");
    } else {
      useSetItem("token", "nothing");
    }
  } catch {
    toast.error("مشکلی پیش آمده لطفا بعدا امتحان کنید");
    return false;
  }
};

export default LoginUser;
