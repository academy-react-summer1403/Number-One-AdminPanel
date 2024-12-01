import * as Yup from "yup";
const ShopCategoryValidation = Yup.object({
    categoryName: Yup.string().max(20,"حداکثر باید 20 کاراکتر باشد").required("فیلد الزامی!"),
    describe: Yup.string().max(50,"حداکثر باید 50 کاراکتر باشد").required("فیلد الزامی!"),
});

export default ShopCategoryValidation;
