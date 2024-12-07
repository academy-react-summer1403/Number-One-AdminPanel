import toast from "react-hot-toast";
import axios from "axios";

const UpdateShop = async (id, values, refetch) => {
  try {
    const response = await toast.promise(
      axios.put(
        `https://6653aa591c6af63f46754aa6.mockapi.io//users/${id}`,
        values
      ),
      {
        error: "مشکلی در تغییر اطلاعات پیش آمده است",
        loading: "در ویرایش اطلاعات...",
        success: "اطلاعات با موفقیت تغییر کرد"
      }
    );
    if (response) {
      refetch();
    }
  } catch (error) {
    return;
  }
};

export default UpdateShop;
