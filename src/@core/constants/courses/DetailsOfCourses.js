import { CheckSquare, Send, Users } from "react-feather";

const DetailsOfCourses = (data) => {
    const CourseDetailsData = [
      {
        title: "تعداد کامنت ها",
        color: "primary",
        icon: Send,
        renderStats: data?.courseCommentTotal,
      },
      {
        title: "تعداد کاربران",
        color: "success",
        icon: Users,
        renderStats: data?.courseUserTotal,
      },
      {
        title: "تعداد رزرو ها",
        color: "warning",
        icon: CheckSquare,
        renderStats: data?.reserveUserTotal,
      },
    ];
    return CourseDetailsData;
  };

  export default DetailsOfCourses