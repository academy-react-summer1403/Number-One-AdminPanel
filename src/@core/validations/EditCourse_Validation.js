import * as Yup from "yup";

const EditCourseValidation = Yup.object({
    Title: Yup.string().max(32,"متن بیش از حد مجاز!").required("فیلد الزامی!"),
    Capacity: Yup.number("لطفا عدد وارد کنید").min(1, 'مقدار باید حداقل 1 باشد').max(450, 'مقدار باید حداکثر 5 باشد').required("فیلد الزامی!"),
    SessionNumber: Yup.number("لطفا عدد وارد کنید").min(1, 'مقدار باید حداقل 1 باشد').max(50, 'مقدار باید حداکثر 5 باشد').required("فیلد الزامی!"),
    MiniDescribe: Yup.string().min(3,'طول  نویسه کم تر از حد مجاز').max(290,'طول نویسه بیش از حد مجاز').required("فیلد الزامی!"),
    Describe: Yup.string().min(3,'طول  نویسه کم تر از حد مجاز').max(850,'طول نویسه بیش از حد مجاز').required("فیلد الزامی!"),
});

export default EditCourseValidation;
