import { Activity, Globe, Slash } from "react-feather";

export const TermReports = (data) => {
  const reports = [
    {
      title: "کل ترم ها",
      color: "primary",
      stats: data?.length,
      icon: Globe,
    },
    {
      title: "ترم های منقضی نشده",
      color: "success",
      stats: data && data.filter((item) => !item.expire)?.length,
      icon: Activity,
    },
    {
      title: "ترم های منقضی شده",
      color: "warning",
      stats: data && data.filter((item) => item.expire)?.length,
      icon: Slash,
    },
  ];

  return reports;
};
