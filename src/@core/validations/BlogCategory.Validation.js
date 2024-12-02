import * as Yup from "yup";

const BlogCategoryValidation = Yup.object({
  CategoryName: Yup.string().required("فیلد الزامی!"),
  GoogleTitle: Yup.string()
    .min(40, "مقدار باید حداقل 40 کاراکتر باشد")
    .max(70, "مقدار باید حداکثر 70 کاراکتر باشد")
    .required("فیلد الزامی!"),
  GoogleDescribe: Yup.string()
    .min(70, "مقدار باید حداقل 70 کاراکتر باشد")
    .max(150, "مقدار باید حداکثر 150 کاراکتر باشد")
    .required("فیلد الزامی!"),
});

export default BlogCategoryValidation;
