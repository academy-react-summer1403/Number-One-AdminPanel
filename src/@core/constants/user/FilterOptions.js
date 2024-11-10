const roleOptions = [
  { value: null, label: "انتخاب کنید..." },
  { value: "1", label: "ادمین" },
  { value: "2", label: "استاد" },
  { value: "5", label: "دانشجو" },
];

const isActiveOptions = [
  { value: null, label: "انتخاب کنید..." },
  { value: true, label: "فعال" },
  { value: false, label: "غیرفعال" },
];

const statusOptions = [
  { value: null, label: "انتخاب کنید..." },
  { value: "profileCompletionPercentage", label: "درصد تکمیل پروفایل" },
  { value: "insertDate", label: "تاریخ ایجاد کاربر" },
];

const AscDescOptions = [
  { value: null, label: "انتخاب کنید..." },
  { value: "ASC", label: "صعودی" },
  { value: "DESC", label: "نزولی" },
];

export { AscDescOptions, statusOptions, isActiveOptions, roleOptions };
