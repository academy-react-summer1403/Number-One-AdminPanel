import { Activity, ShoppingBag, Slash } from "react-feather";

const StatisticsOfShop = (data) => {
  const Activists = data?.filter((item) => item.isActive);
  // const inactive = data?.courseDtos?.filter((item) => item.);

  const shopSummaryData = [
    {
      title: "مجموع فروشگاه ها",
      color: "primary",
      icon: ShoppingBag,
      renderStats: data?.length,
    },
    {
      title: "فروشگاه های فعال",
      color: "success",
      icon: Activity,
      renderStats: Activists?.length,
    },
    {
      title: "فروشگاه های غیر فعال",
      color: "warning",
      icon: Slash,
      renderStats: data?.length - Activists?.length,
    },
  ];
  return shopSummaryData;
};

export default StatisticsOfShop;
