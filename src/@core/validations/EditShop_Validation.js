import * as Yup from "yup";

const EditShopValidation = Yup.object({
    name: Yup.string().max(32,"متن بیش از حد مجاز!").required("فیلد الزامی!"),
    rate: Yup.number("لطفا عدد وارد کنید").min(1, 'مقدار باید حداقل 1 باشد').max(5, 'مقدار باید حداکثر 5 باشد').required("فیلد الزامی!"),
    categoryId: Yup.string().required("فیلد الزامی!"),
    address: Yup.string().max(88,"متن بیش از حد مجاز!").required("فیلد الزامی!"),
    startTime: Yup.number("لطفا عدد وارد کنید!").min(0,"زمان باید از 0 به بعد باشد").max(23,"زمان باید کمتر از 24 باشد").required("فیلد الزامی!"),
    endTime: Yup.number("لطفا عدد وارد کنید!").min(1,"زمان باید از 1 به بعد باشد").max(23,"زمان باید کمتر از 24 باشد").required("فیلد الزامی!"),
});

export default EditShopValidation;
