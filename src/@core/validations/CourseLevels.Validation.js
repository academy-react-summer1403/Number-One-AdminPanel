import * as Yup from "yup";
const CourseLevelsValidation = Yup.object({
  levelName: Yup.string().required("فیلد الزامی!"),
});

export default CourseLevelsValidation;
