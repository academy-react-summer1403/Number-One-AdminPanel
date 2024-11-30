import { Activity, Book, Slash } from "react-feather";
import {
  handleIsActive,
  handleSortingCol,
} from "../../../view/news/store/NewsList";

export const StatisticsOfNews = (data) => {
  const newsSummaryData = [
    {
      title: "مجموع اخبار و مقالات",
      color: "primary",
      icon: Book,
      renderStats: data?.active + data?.unActive,
    },
    {
      title: "اخبار و مقالات فعال",
      color: "success",
      icon: Activity,
      renderStats: data?.active,
    },
    {
      title: "اخبار و مقالات غیر فعال",
      color: "warning",
      icon: Slash,
      renderStats: data?.unActive,
    },
  ];

  return newsSummaryData;
};

export const NewsSortOption = [
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

export const StatisticsOfNewsCategories = (data) => {
  const newsCategoryData = [
    {
      title: "مجموع دسته بندی ها  ",
      color: "primary",
      icon: Book,
      renderStats: data?.length,
    },
  ];

  return newsCategoryData;
};

export const categoryNewsTableTitles = [
  "",
  "نام دسته بندی",
  "عنوان گوگل",
  "اقدام",
];
