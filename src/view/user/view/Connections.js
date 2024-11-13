// Redux
import { useSelector } from "react-redux";

// ** Icons
import twitterIcon from "../../../assets/images/icons/twitter.png";
import linkedinIcon from "../../../assets/images/icons/linkedin.png";

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

  return (
    <>
      <div className="divider divider-start">
        <div className="divider-text fs-2">شبکه های اجتماعی</div>
      </div>
      {informationList.map((item, index) => (
        <MoreInfoItems
          action={item.info}
          icon={item.icon}
          label={item.label}
          key={index}
        />
      ))}
    </>
  );
};

export default connections;
