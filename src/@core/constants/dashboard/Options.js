import { Award, Book, CheckCircle, CheckSquare, Send, Users, UserX, X } from "react-feather";

export const generalStatistics = (courses,comments,teachers,reports) => {
  const data = [
    {
      title: reports?.allUser,
      subtitle: " کاربران",
      color: "primary",
      icon: <Users size={24} />,
    },
    {
      title: courses?.totalCount,
      subtitle: "دوره ها",
      color: "secondary",
      icon: <Book size={24} />,
    },
    {
      title: comments?.totalCount,
      subtitle: "کامنت ها",
      color: "success",
      icon: <Send size={24} />,
    },
    {
      title: teachers?.teachers.totalCount,
      subtitle: "اساتید",
      color: "danger",
      icon: <Award size={24} />,
    },
    {
      title: reports?.deactiveUsers,
      subtitle: "کاربران غیر فعال",
      color: "danger",
      icon: <UserX size={24} />,
    },
    {
      title: reports?.inCompeletUserCount,
      subtitle: "پروفایل های تکمیل شده",
      color: "success",
      icon: <CheckSquare size={24} />,
    },
    {
      title: reports?.allReserveAccept,
      subtitle: "رزرو های تایید شده",
      color: "primary",
      icon: <CheckCircle size={24} />,
    },
    {
      title: reports?.allReserveNotAccept,
      subtitle: "رزرو های تایید نشده",
      color: "warning",
      icon: <X size={24} />,
    },
  ];
  return data;
};
