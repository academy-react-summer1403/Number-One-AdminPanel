import * as yup from "yup";

const ReplayValidate = yup.object().shape({
  Title: yup
    .string()
    .min(5, "طول نویسه کم تر از حد مجاز!")
    .max(60, "طول نویسه بیش تر از حد مجاز!")
    .required("این فیلد الزامی می باشد!"),
  Describe: yup
    .string()
    .min(5, "طول نویسه کم تر از حد مجاز!")
    .max(100, "طول نویسه بیش تر از حد مجاز!")
    .required("این فیلد الزامی می باشد!"),
});

export default ReplayValidate;
