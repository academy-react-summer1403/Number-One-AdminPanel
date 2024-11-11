import avatar2 from "@src/assets/images/portrait/small/avatar-s-5.jpg";
import avatar3 from "@src/assets/images/portrait/small/avatar-s-21.jpg";
import avatar4 from "@src/assets/images/portrait/small/user.png";

// Icons
import AdminIcon from "../../../assets/images/portrait/small/admin.jfif";

import RoleCards from "../../roles-permissions/roles/RoleCards";

const RoleGenerator = ({ Roles }) => {
  var data = [
    {
      title: "Administrator",
      users: [],
    },
  ];

  // If Roles is null or an empty string, consider the user as a simple user
  if (
    Roles === null ||
    Roles === "" ||
    (typeof Roles === "string" &&
      Roles.indexOf("Administrator") === -1 &&
      Roles.indexOf("Student") === -1 &&
      Roles.indexOf("Teacher") === -1)
  ) {
    data[0].users.push({
      size: "md",
      title: "کاربر ساده",
      img: avatar4,
    });
  } else {
    let Admin = Roles.indexOf("Administrator");
    let Student = Roles.indexOf("Student");
    let Teacher = Roles.indexOf("Teacher");

    Student != -1 &&
      data[0].users.push({
        size: "md",
        title: "دانش آموز",
        img: avatar3,
      });
    Teacher != -1 &&
      data[0].users.push({
        size: "md",
        title: "استاد",
        img: avatar2,
      });
    Admin != -1 &&
      data[0].users.push({
        size: "md",
        title: "ادمین",
        img: AdminIcon,
      });
  }

  return <RoleCards data={data} />;
};

export default RoleGenerator;
