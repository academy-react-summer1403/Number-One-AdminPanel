// Redux
import { useSelector } from "react-redux";

// ** Reactstrap Imports
import twitterIcon from "../../../assets/images/icons/social/twitter.png";
import linkedinIcon from "../../../assets/images/icons/social/linkedin.png";

// Custom Component
import MoreInfoItems from "./MoreInfoItems";

const connections = () => {
  const userInfo = useSelector((state) => state.UserInfoSlice.details);
  const informationList = [
    {
      icon: twitterIcon,
      label: "تلگرام",
      info:
        userInfo.telegramLink && userInfo.telegramLink !== null
          ? userInfo.telegramLink
          : "تکمیل نشده",
    },
    {
      icon: linkedinIcon,
      label: "لینکدین",
      info:
        userInfo.linkdinProfile && userInfo.linkdinProfile !== null
          ? userInfo.linkdinProfile
          : "تکمیل نشده",
    },
  ];

  return informationList.map((item, index) => (
    <MoreInfoItems
      action={item.info}
      icon={item.icon}
      label={item.label}
      key={index}
    />
  ));
};

export default connections;
