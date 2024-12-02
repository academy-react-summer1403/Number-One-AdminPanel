import * as Yup from "yup";
const CourseStatusValidation = Yup.object({
  statusName: Yup.string().required("فیلد الزامی!"),
  describe: Yup.string().required("فیلد الزامی!"),
  statusNumber: Yup.number()
    .typeError("لطفا عدید وارد کنید!")
    .required("فیلد الزامی!"),
});

export default CourseStatusValidation;
