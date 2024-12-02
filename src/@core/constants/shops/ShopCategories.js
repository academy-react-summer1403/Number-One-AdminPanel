import { Sliders } from "react-feather";

export const StatisticsOfShopCategory = (data) => {
  const shopCategoryData = [
    {
      title: "مجموع دسته بندی های فروشگاه ",
      color: "primary",
      icon: Sliders,
      renderStats: data?.length,
    },
  ];

  return shopCategoryData;
};

export const shopCategoriesTableTitles = ['','نام دسته یندی','توضیحات دسته بندی','اقدام']

