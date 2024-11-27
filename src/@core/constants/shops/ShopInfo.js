import HandleIdentityEditorJs from "../../../utility/create-editorjs-blocks/IdentityEditorJs";
import { useQueryWithDependencies } from "../../../utility/hooks/useCustomQuery";
import GetShopCategory from "../../services/api/get-api/GetShopCategory";

const ShopInfo = (data) => {
  // Get Category For Shop
  const { data: category,} = useQueryWithDependencies(
    "GET_SHOP_CATEGORY",
    GetShopCategory,
    data?.categoryId,
    data?.categoryId
  );
  const detailCourse = [
    { label: "دسته بندی", value: category?.categoryName },
    {
      label: "زمان ارسال محموله ها",
      value:
        "از ساعت " + data?.startTime + ":00" + " الی " + data?.endTime + ":00",
    },
    { label: "آدرس", value: data?.address },
    {
      label: "درباره فروشگاه",
      value: <HandleIdentityEditorJs desc={data?.aboutUs} />,
    },
  ];
  return detailCourse;
};

export default ShopInfo;
