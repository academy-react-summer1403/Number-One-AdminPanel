import { Activity, Book, Clock, X } from "react-feather";

const StatisticsOfCourses = (data) => {
    const Activists = data?.courseDtos?.filter((item) => item.isActive);
    const Expired = data?.courseDtos?.filter((item) => item.isExpire);
    const Deleted = data?.courseDtos?.filter((item) => item.isdelete);
  
    const CommentSummaryData = [
      {
        title: "مجموع دوره ها",
        color: "primary",
        icon: Book,
        renderStats: data?.totalCount,
      },
      {
        title: "دوره های فعال",
        color: "success",
        icon: Activity,
        renderStats: Activists?.length,
      },
      {
        title: "دوره های منقضی شده",
        color: "warning",
        icon: Clock,
        renderStats: Expired?.length,
      },
      {
        title: "دوره های حذف شده",
        color: "danger",
        icon: X,
        renderStats: Deleted?.length,
      },
    ];
    return CommentSummaryData;
  };

  export default StatisticsOfCourses