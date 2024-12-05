import * as Yup from "yup";
const ScheduleValidation = Yup.object({
  // courseGroupId: Yup.string().required("گروه دوره الزامی است"),
  startTime: Yup.number()
    .required("ساعت شروع الزامی است")
    .min(1, "ساعت شروع باید از 1 بیشتر باشد")
    .max(24, "ساعت شروع باید از 24 کمتر باشد"),

  endTime: Yup.number()
    .required("ساعت پایان الزامی است")
    .min(
      Yup.ref("startTime"),
      "زمان پایان کلاس باید بعد از زمان شروع کلاس باشد"
    )
    .max(24, "ساعت پایان باید از 24 کمتر باشد"),
  weekNumber: Yup.number()
    .required("تعداد کلاس در هفته الزامی است")
    .min(1, "تعداد کلاس در هفته باید حداقل 1 باشد")
    .max(7, "تعداد کلاس در هفته باید حداکثر 7 باشد"),
  rowEffect: Yup.number()
    .required("تعداد کل کلاس ها الزامی است")
    .min(1, "تعداد   کل کلاس ها باید حداقل 1 باشد"),
});

export default ScheduleValidation;
