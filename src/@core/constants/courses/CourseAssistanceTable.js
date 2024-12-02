export const CourseAssistanceTable = [
  "آیدی",
  "نام منتور",
  "تاریخ ایجاد",
  "اقدام",
];

export const EditAssistanceFields = (detail) => {
  const fields = {
    id: detail?.id ?? "",
    userId: detail?.userId ?? "",
    courseId: detail?.courseId ?? "",
  };

  return fields;
};
