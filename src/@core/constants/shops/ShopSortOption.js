import {
  handleIsActive,
  handleSortingCol,
} from "../../../view/shops/store/ShopList";

const ShopSortOption = [
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
      { value: "workTime", label: "بیشترین تایم کاری" },
    ],
    setState: handleSortingCol,
  },
];

export default ShopSortOption;
