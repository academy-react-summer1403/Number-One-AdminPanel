import * as Yup from "yup";

const TechnologiesValidation = Yup.object({
  techName: Yup.string().required("فیلد الزامی!"),
  describe: Yup.string().required("فیلد الزامی!"),
});

export default TechnologiesValidation;
