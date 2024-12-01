import { Activity, ShoppingBag, Slash, Sliders } from "react-feather";
import {
  handleIsActive,
  handleSortingCol,
} from "../../../view/products/store/ProductsList";

export const StatisticsOfProducts = (data) => {
  const Activists = data?.filter((item) => item.isActive);

  const productsSummaryData = [
    {
      title: "مجموع محصولات",
      color: "primary",
      icon: ShoppingBag,
      renderStats: data?.length,
    },
    {
      title: "محصولات فعال",
      color: "success",
      icon: Activity,
      renderStats: Activists?.length,
    },
    {
      title: "محصولات غیر فعال",
      color: "warning",
      icon: Slash,
      renderStats: data?.length - Activists?.length,
    },
  ];

  return productsSummaryData;
};

export const ProductsSortOption = [
  {
    Options: [
      { value: true, label: "فعال" },
      { value: false, label: "غیر فعال" },
    ],
    setState: handleIsActive,
  },
  {
    Options: [
      { value: "rate", label: "محبوب ترین ها" },
      { value: "price", label: "ارزان ترین" },
    ],
    setState: handleSortingCol,
  },
];

export const StatisticsOfProductCategory = (data) => {
  const productCategoryData = [
    {
      title: "مجموع دسته بندی های محصول ",
      color: "primary",
      icon: Sliders,
      renderStats: data?.length,
    },
  ];

  return productCategoryData;
};
export const productCategoriesTableTitles = ['','نام دسته یندی','توضیحات دسته بندی','اقدام']

