import * as Yup from "yup";

const CreateNewsValidations = Yup.object({
  Title: Yup.string()
    .required("این فیلد الزامی است.")
    .min(10, "تعداد کارکتر های عنوان بین 10 الی 120 میباشد")
    .max(120, "تعداد کارکتر های عنوان بین 10 الی 120 میباشد"),
  GoogleTitle: Yup.string()
    .required("این فیلد الزامی است.")
    .min(50, "تعداد کارکتر های عنوان گوگل بین 50 الی 70 میباشد.")
    .max(70, "تعداد کارکتر های عنوان گوگل بین 5 الی 70 میباشد."),
  GoogleDescribe: Yup.string()
    .required("این فیلد الزامی است.")
    .min(70, "تعداد کارکتر های توضیحات گوگ بین 70 الی 150 میباشد.")
    .max(150, "تعداد کارکتر های توضیحات گوگ بین 70 الی 150 میباشد."),
  MiniDescribe: Yup.string()
    .required("این فیلد الزامی است.")
    .min(10, "تعداد کارکتر های توضیحات کوتاه بین 10 الی 300 میباشد.")
    .max(300, "تعداد کارکتر های توضیحات کوتاه بین 10 الی 300 میباشد."),
  Keyword: Yup.string()
    .required("این فیلد الزامی است.")
    .min(10, "تعداد کارکتر های  کلمه کلیدی بین 10 الی 300 میباشد.")
    .max(300, "تعداد کارکتر های  کلمه کلیدی بین 10 الی 300 میباشد."),
  NewsCatregoryId: Yup.string().required("این فیلد الزامی است."),
});

export default CreateNewsValidations;
