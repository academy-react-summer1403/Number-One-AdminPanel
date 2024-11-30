import { Activity, Globe, Slash } from "react-feather";

export const BuildingReports = (data) => {
  const reports = [
    {
      title: "کل ساختمان ها",
      color: "primary",
      stats: data?.length,
      icon: Globe,
    },
    {
      title: "ساختمان های فعال",
      color: "success",
      stats: data && data.filter((item) => item.active)?.length,
      icon: Activity,
    },
    {
      title: "ساختمان های غیر فعال",
      color: "warning",
      stats: data && data.filter((item) => !item.active)?.length,
      icon: Slash,
    },
  ];

  return reports;
};
