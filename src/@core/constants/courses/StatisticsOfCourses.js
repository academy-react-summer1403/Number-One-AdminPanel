import { Activity, BarChart, Book, BookOpen, Clock, Sliders, X } from "react-feather";

export const StatisticsOfCourses = (data) => {
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


  export const StatisticsOfCourseTechnologies = (data) => {
    const courseTechData = [
      {
        title: "مجموع تکنولوژی ها  ",
        color: "primary",
        icon: BookOpen,
        renderStats: data?.length,
      },
    ];
  
    return courseTechData;
  };

  export const StatisticsOfCourseStatus= (data) => {
    const courseStatusData = [
      {
        title: "مجموع وضعیت ها",
        color: "primary",
        icon: Sliders ,
        renderStats: data?.length,
      },
    ];
  
    return courseStatusData;
  };
  export const StatisticsOfCourseLevel= (data) => {
    const courseLevelData = [
      {
        title: "مجموع سطح های دوره",
        color: "primary",
        icon: BarChart  ,
        renderStats: data?.length,
      },
    ];
  
    return courseLevelData;
  };