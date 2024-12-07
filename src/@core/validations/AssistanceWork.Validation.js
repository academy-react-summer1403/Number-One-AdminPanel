import * as Yup from "yup";

const AssistanceWorkValidations = Yup.object({
  worktitle: Yup.string()
    .required("فیلد الزامی!")
    .min(5, "تعداد کارکتر های عنوان کار بین 5 الی 90 میباشد.")
    .max(90, "تعداد کارکتر های عنوان کار بین 5 الی 90 میباشد."),
  workDescribe: Yup.string()
    .required("فیلد الزامی!")
    .min(5, "تعداد کارکتر های عنوان کار بین 5 الی 90 میباشد.")
    .max(450, "تعداد کارکتر های عنوان کار بین 5 الی 90 میباشد."),
  assistanceId: Yup.string().required("فیلد الزامی!"),
  workDate: Yup.string().required("فیلد الزامی!")
});

export default AssistanceWorkValidations;
