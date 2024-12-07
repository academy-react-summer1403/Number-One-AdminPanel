import * as Yup from "yup";

const DepartmentValidations = Yup.object({
  depName: Yup.string()
    .required("فیلد الزامی!")
    .min(5, "تعداد کارکتر های نام دپارتمان بین 5 الی 70 میباشد.")
    .max(70, "تعداد کارکتر های نام دپارتمان بین 5 الی 70 میباشد."),
  buildingId: Yup.string().required("فیلد الزامی!")
});

export default DepartmentValidations;
