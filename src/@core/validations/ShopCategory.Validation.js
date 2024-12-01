import * as Yup from "yup";
const ShopCategoryValidation = Yup.object({
    categoryName: Yup.string().max(20,"حداکثر باید 20 کاراکتر باشد").required("فیلد الزامی!"),
    describe: Yup.string().max(40,"حداکثر باید 40 کاراکتر باشد").required("فیلد الزامی!"),
});

export default ShopCategoryValidation;
