import axios from "axios";
import toast from "react-hot-toast";

const CreateImageAi = async (data) => {
  console.log(data);
  try {
    const result = await toast.promise(
      axios.post("https://api.segmind.com/v1/sdxl1.0-txt2img", data, {
        responseType: "arraybuffer",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "SG_e223471534b9e8bd",
        },
      }),
      {
        loading: "درحال یافتن عکس",
        success: "عکس با موفقیت پیدا شد",
        error: "برای سرور مشکل به وجود امد لطفا بعدا تلاش کنید",
      }
    );
    const pictureBlob = new Blob([result.data], { type: "image/jpeg" });
    const pictureUrl = URL.createObjectURL(pictureBlob);
    return pictureUrl;
  } catch (error) {
    console.log(error);
  }
};

export default CreateImageAi;
