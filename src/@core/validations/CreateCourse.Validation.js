import * as Yup from "yup";

export const validCreateCourseLv1 = Yup.object().shape({
  Title: Yup.string()
    .min(3, "طول نویسه باید بیشتر از 3 حرف باشد")
    .required("نام دوره الزامی است"),
  GoogleTitle: Yup.string(),
  Capacity: Yup.number()
    .typeError("ظرفیت دوره باید عدد باشد")
    .min(1, "ظرفیت دوره باید حداقل ۱ باشد")
    .required("ظرفیت دوره الزامی است"),
  Cost: Yup.number()
    .typeError("قیمت دوره باید یک عدد باشد")
    .required("قیمت دوره الزامی است"),
});
export const validCreateCourseLv2 = Yup.object().shape({
    CourseTypeId: Yup.number().required("نوع دوره الزامی است"),
    CourseLvlId: Yup.number().required("سطح دوره الزامی است"),
    TeacherId: Yup.number().required("استاد دوره الزامی است"),
    TremId: Yup.number()
      .typeError("آیدی ترم باید یک عدد باشد")
      .required("آیدی ترم الزامی است"),
    ClassId: Yup.number().required("کلاس دوره الزامی است"),
    SessionNumber: Yup.number()
      .typeError("تعداد جلسات باید یک عدد باشد")
      .required("تعداد جلسات الزامی است"),
  });
