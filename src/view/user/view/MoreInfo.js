// Redux
import { useSelector } from "react-redux";

// ** Social Icon Imports
import slackIcon from "../../../assets/images/icons/social/slack.png";
import asanaIcon from "../../../assets/images/icons/social/asana.png";
import googleIcon from "../../../assets/images/icons/social/google.png";
import githubIcon from "../../../assets/images/icons/social/github.png";
import mailchimpIcon from "../../../assets/images/icons/social/mailchimp.png";

// Custom Component
import MoreInfoItems from "./MoreInfoItems";

const MoreInfo = () => {
  const usersDetails = useSelector((state) => state.UserInfoSlice.details);

  const informationList = [
    {
      icon: githubIcon,
      label: "درباره کاربر",
      info:
        usersDetails.userAbout && usersDetails.userAbout !== null
          ? usersDetails.userAbout
          : "تکمیل نشده",
    },
    {
      icon: mailchimpIcon,
      label: "آدرس محل سکونت",
      info:
        usersDetails.homeAdderess && usersDetails.homeAdderess !== null
          ? usersDetails.homeAdderess
          : "تکمیل نشده",
    },
    {
      icon: asanaIcon,
      label: "تاریخ تولد",
      info:
        usersDetails.birthDay && usersDetails.birthDay !== "0001-01-01T00:00:00"
          ? usersDetails.birthDay
          : "تکمیل نشده",
    },
    { icon: mailchimpIcon, label: "آی دی کاربر", info: usersDetails.id },
    {
      icon: asanaIcon,
      label: "تاریخ ایجاد حساب کاربری",
      info: usersDetails.insertDate,
    },
    {
      icon: slackIcon,
      label: "اعتبارسنجی دو مرحله ای",
      info:
        usersDetails.twoStepAuth && usersDetails.twoStepAuth !== false
          ? "فعال"
          : "غیرفعال",
    },
    {
      icon: googleIcon,
      label: "ایمیل بازیابی",
      info:
        usersDetails.recoveryEmail && usersDetails.recoveryEmail !== null
          ? usersDetails.recoveryEmail
          : "تکمیل نشده",
    },
    {
      icon: slackIcon,
      label: "دریافت پیام رویدادها",
      info:
        usersDetails.receiveMessageEvent &&
        usersDetails.receiveMessageEvent !== false
          ? "فعال"
          : "غیرفعال",
    },
  ];

  return informationList.map((item, index) => (
    <MoreInfoItems
      key={index}
      action={item.info}
      icon={item.icon}
      label={item.label}
    />
  ));
};

export default MoreInfo;
