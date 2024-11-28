// Customize
import ChangeMoment from "../../../utility/moment";
import { SeparationPrice } from "../../../utility/separation-price";

export const ProductsInformation = (data, shopDetails, category) => {
  const detailProducts = [
    { label: "فروشگاه", value: shopDetails?.name },
    { label: "دسته بندی", value: category?.categoryName },
    {
      label: "تاریخ ایجاد",
      value: ChangeMoment(data?.insertDate, "YYYY/MM/DD", "persian"),
    },
    { label: "تعداد موجود در انبار", value: data?.exist },
    { label: "قیمت", value: SeparationPrice(data?.price) },
    { label: "تخفیف", value: data?.discount + "%" },
    { label: "فروش ویژه", value: data?.special },
    { label: "توضیحات کلی", value: data?.miniDiscribe },
  ];

  return detailProducts;
};
