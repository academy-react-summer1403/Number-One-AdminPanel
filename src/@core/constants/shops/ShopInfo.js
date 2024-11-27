import HandleIdentityEditorJs from "../../../utility/create-editorjs-blocks/IdentityEditorJs";

const ShopInfo = (data) => {
  const detailCourse = [
    { label: "دسته بندی", value: data?.category },
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
