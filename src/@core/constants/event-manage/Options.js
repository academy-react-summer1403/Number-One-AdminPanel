import { Activity, ShoppingBag, Slash } from "react-feather";
import { handleIsActive } from "../../../view/event/store/EventsList";

export const StatisticsOfEvents = (data) => {
  const Activists = data?.filter((item) => item.isActive);

  const eventsSummaryData = [
    {
      title: "مجموع ایونت ها",
      color: "primary",
      icon: ShoppingBag,
      renderStats: data?.length,
    },
    {
      title: "ایونت های فعال",
      color: "success",
      icon: Activity,
      renderStats: Activists?.length,
    },
    {
      title: "ایونت های غیر فعال",
      color: "warning",
      icon: Slash,
      renderStats: data?.length - Activists?.length,
    },
  ];

  return eventsSummaryData;
};

export const eventsSortOption = [
  {
    Options: [
      { value: true, label: "فعال" },
      { value: false, label: "غیر فعال" },
    ],
    setState: handleIsActive,
  },
];
