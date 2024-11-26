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

export const validCreateCourseLv3 = Yup.object().shape({
  StartTime: Yup.date().required("زمان شروع دوره الزامی است"),
  EndTime: Yup.date()
    .required("زمان پایان دوره الزامی است")
    .min(
      Yup.ref("StartTime"),
      "زمان پایان دوره باید بعد از زمان شروع دوره باشد"
    ),
  MiniDescribe: Yup.string().required("توضیحات کوتاه الزامی می باشد"),
  UniqeUrlString: Yup.string()
    .max(30, "شناسه دوره حداکثر باید 30 کاراکتر باشد")
    .required("شناسه دوره الزامی می باشد"),
});

export const validCreateImageCourse = Yup.object().shape({
  Text: Yup.string()
    .typeError("لطفا نوشته وارد کنید")
    .required("متن جستجو را وارد کنید!"),
});

