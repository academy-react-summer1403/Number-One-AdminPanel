// ** React Imports
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Third Party Components
import { LogOut } from "react-feather";

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";

// ** Default Avatar Image
import fallback from "../../../../assets/images/portrait/small/user-circle-icon.png";

import { useGetItem } from "../../../../utility/hooks/useLocalStorage";
import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-Decode";
import { GetAdminInfo } from "../../../services/api/get-api";

const UserDropdown = () => {
  let userToken = useGetItem("token") && useGetItem("token");
  let userId = useGetItem("id") && useGetItem("id");

  const userData = jwtDecode(userToken);

  const userRoles =
    userData &&
    userData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

  const { data, isSuccess } = useQuery({
    queryKey: ["GET_USER_INFORMATION"],
    queryFn: () => {
      return GetAdminInfo(userId);
    },
  });

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bold">
            {isSuccess && data.fName} {isSuccess && data.lName}
          </span>
          <span className="user-status">
            {userRoles?.includes("Administrator") ? "ادمین" : "استاد"}
          </span>
        </div>
        <Avatar
          img={
            data?.currentPictureAddress ? data?.currentPictureAddress : fallback
          }
          imgHeight="40"
          imgWidth="40"
          status="online"
        />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to="/login">
          <LogOut size={14} className="me-75" />
          <span className="align-middle">خروج از حساب</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
