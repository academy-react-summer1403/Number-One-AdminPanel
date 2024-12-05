export const SessionDetails = (data) => {
  console.log(data)
  const sessionData = [
    { label: "عنوان جلسه", value: data?.sessionTitle },
    { label: "توضیحات جلسه", value: data?.sessionDescribe },
    { label: "زمان شروع", value: data?.schedualStartTime },
    { label: "زمان پایان", value: data?.schedualEndTime },
  ];
  return sessionData
};

export const HWHeaderTable = ["نام تکلیف", "توضیحات", "تاریخ ایجاد", "اقدام"];
