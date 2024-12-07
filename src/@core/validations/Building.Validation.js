import * as Yup from "yup";

const BuildingValidation = Yup.object({
  buildingName: Yup.string()
    .required("فیلد الزامی!")
    .min(5, "تعداد کارکتر های نام ساختمان بین 5 الی 50 میباشد.")
    .max(50, "تعداد کارکتر های نام ساختمان بین 5 الی 50 میباشد."),
  workDate: Yup.string().required("فیلد الزامی!"),
  floor: Yup.number().required("فیلد الزامی!"),
  latitude: Yup.string().required("فیلد الزامی!"),
  longitude: Yup.string().required("فیلد الزامی!")
});

export default BuildingValidation;
