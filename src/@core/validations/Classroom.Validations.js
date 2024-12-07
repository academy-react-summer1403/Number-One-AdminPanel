import * as Yup from "yup";

const ClassroomValidations = Yup.object({
  classRoomName: Yup.string()
    .required("فیلد الزامی!")
    .min(5, "تعداد کارکتر های نام کلاس بین 5 الی 50 میباشد.")
    .max(50, "تعداد کارکتر های نام کلاس بین 5 الی 50 میباشد."),
  capacity: Yup.string().required("فیلد الزامی!")
});

export default ClassroomValidations;
