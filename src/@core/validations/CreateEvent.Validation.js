import * as Yup from "yup";

const CreateEventValidations = Yup.object({
  title: Yup.string()
    .required("این فیلد الزامی است.")
    .min(10, "تعداد کارکتر های عنوان بین 10 الی 120 میباشد")
    .max(120, "تعداد کارکتر های عنوان بین 10 الی 120 میباشد"),
  googleTitle: Yup.string()
    .required("این فیلد الزامی است.")
    .min(50, "تعداد کارکتر های عنوان گوگل بین 50 الی 70 میباشد.")
    .max(70, "تعداد کارکتر های عنوان گوگل بین 5 الی 70 میباشد."),
  googleDescribe: Yup.string()
    .required("این فیلد الزامی است.")
    .min(70, "تعداد کارکتر های توضیحات گوگ بین 70 الی 150 میباشد.")
    .max(150, "تعداد کارکتر های توضیحات گوگ بین 70 الی 150 میباشد."),
  miniDescribe: Yup.string()
    .required("این فیلد الزامی است.")
    .min(10, "تعداد کارکتر های توضیحات کوتاه بین 10 الی 300 میباشد.")
    .max(300, "تعداد کارکتر های توضیحات کوتاه بین 10 الی 300 میباشد."),
  price: Yup.string().required("این فیلد الزامی است."),
  address: Yup.string().required("این فیلد الزامی است."),
  students: Yup.string().required("این فیلد الزامی است."),
  chairs: Yup.string().required("این فیلد الزامی است."),
  startEventTime: Yup.string().required("این فیلد الزامی است."),
});

export default CreateEventValidations;
