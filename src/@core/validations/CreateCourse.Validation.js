import * as Yup from "yup";

export const validCreateCourseLv1 = Yup.object().shape({
  Title: Yup.string()
    .min(3, "طول نویسه باید بیشتر از 3 حرف باشد")
    .required("نام دوره الزامی است"),
  GoogleTitle: Yup.string(),
  Capacity: Yup.number()
    .typeError("ظرفیت دوره باید عدد باشد")
    .min(1, "ظرفیت دوره باید حداقل ۱ باشد")
    .required("ظرفیت دوره الزامی است"),
  Cost: Yup.number()
    .typeError("قیمت دوره باید یک عدد باشد")
    .required("قیمت دوره الزامی است"),
});
