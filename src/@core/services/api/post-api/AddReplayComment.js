import toast from "react-hot-toast";
import useFormData from "../../../../utility/hooks/useFormData";
import http from "../../interceptor";

const AddReplayComment = async (value, ids, refetch) => {
  try {
    const data = {
      CommentId: ids.commentId,
      CourseId: ids.courseId,
      Title: value.Title,
      Describe: value.Describe,
    };
    const formData = useFormData(data);
    const result = await toast.promise(
      http.post("/Course/AddReplyCourseComment", formData),
      {
        pending: "درحال ثبت شدن...",
        success: " ریپلای شما ثبت شد",
        error: "متن کامنت کم تر از حد مجاز",
      }
    );
    if (result.success) {
      refetch();
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default AddReplayComment;
