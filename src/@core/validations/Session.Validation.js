import * as Yup from "yup";

export const AddHWValidation = Yup.object({
  hwTitle: Yup.string()
    .required("فیلد الزامی!")
    .min(40, "تعداد کارکتر های عنوان بین 40 الی 70 میباشد.")
    .max(70, "تعداد کارکتر های عنوان بین 40 الی 70 میباشد."),
  hwDescribe: Yup.string()
    .required("فیلد الزامی!")
    .min(10, " تعداد کارکتر های توضیحات بین 10 الی 500 میباشد.")
    .max(500, " تعداد کارکتر های توضیحات بین 10 الی 500 میباشد."),
});

export const AddSessionValidation = Yup.object({
  sessionTitle: Yup.string()
    .required("فیلد الزامی!")
    .min(40, "تعداد کارکتر های عنوان بین 40 الی 70 میباشد.")
    .max(70, "تعداد کارکتر های عنوان بین 40 الی 70 میباشد."),
  sessionDescribe: Yup.string()
    .required("فیلد الزامی!")
    .min(10, " تعداد کارکتر های توضیحات بین 10 الی 500 میباشد.")
    .max(500, " تعداد کارکتر های توضیحات بین 10 الی 500 میباشد."),
});
