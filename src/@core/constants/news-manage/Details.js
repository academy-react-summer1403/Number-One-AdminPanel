// Customize
import ChangeMoment from "../../../utility/moment";

export const NewsInformation = (data) => {
  const detailNews = [
    { label: "نویسنده", value: data?.addUserFullName },
    { label: "دسته بندی", value: data?.newsCatregoryName },
    { label: "عنوان گوگل", value: data?.googleTitle },
    {
      label: "تاریخ ایجاد",
      value: ChangeMoment(data?.insertDate, "YYYY/MM/DD", "persian"),
    },
    {
      label: "تاریخ بروز رسانی",
      value: ChangeMoment(data?.updateDate, "YYYY/MM/DD", "persian"),
    },
    { label: "توضیحات کلی", value: data?.miniDescribe },
  ];

  return detailNews;
};
