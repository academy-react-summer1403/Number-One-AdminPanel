import toast from "react-hot-toast";
import http from "../../interceptor";

const ActiveDeactiveNews = async (data, refetch) => {
  console.log(data)
  try {
    const response = await http.put("/News/ActiveDeactiveNews", data);
    if(response) {
      toast.success("خبر ویرایش شد")
      refetch()
      return response
    } else {
      toast.error("خبر ویرایش نشد")
    }
  } catch (error) {
    return [];
  }
};

export default ActiveDeactiveNews
