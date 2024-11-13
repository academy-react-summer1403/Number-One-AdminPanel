// Constants
import { tableChartOptions } from "../../../@core/constants/user";

import { MoreVertical, Trash, FileText } from "react-feather";

import Avatar from "@components/avatar";

// Image
import WomanIcon from "../../../assets/images/portrait/small/woman.jpg";
import ManIcon from "../../../assets/images/portrait/small/man.jpg";

import RoleGenerator from "./RoleGenerator";

import {
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";

import Chart from "react-apexcharts";

import { Label } from "reactstrap";
import { useNavigate } from "react-router-dom";

// Api
import { DeleteUser } from "../../../@core/services/api/delete-api";
import { useMutationWithRefetch } from "../../../utility/hooks/useCustomQuery";

const TableItems = ({ item }) => {
  const navigate = useNavigate();

  // Delete User
  const { mutate: handleDeleteUser } = useMutationWithRefetch(
    "DELETE_USER",
    DeleteUser
  );

  return (
    <tr className="text-center ">
      <td style={{ width: "100px" }} className="px-0">
        {item.pictureAddress != null && item.pictureAddress != "Not-set" ? (
          <Avatar img={item.pictureAddress} />
        ) : item.gender ? (
          <Avatar img={ManIcon} />
        ) : (
          <Avatar img={WomanIcon} />
        )}
      </td>
      <td
        style={{ width: "130px" }}
        onClick={() => {
          navigate("/users/view/" + item.id);
        }}
        className="px-0 "
      >
        {item.fname != null && item.lname != null
          ? item.fname + " " + item.lname
          : "نامشخص"}
      </td>
      <td style={{ width: "130px" }} className="">
        <RoleGenerator Roles={item.userRoles} />
      </td>
      <td className="px-0 " style={{ width: "150px" }}>
        {item.gmail}
      </td>
      <td
        style={{ width: "100px" }}
        className="position-relative justify-content-center align-items-center text-center  px-0 "
      >
        <Label
          className="position-absolute top-50 translate-middle"
          for="chart"
          style={{ left: "39%", width: "25px" }}
        >
          {item.profileCompletionPercentage}
        </Label>
        <Chart
          id="chart"
          options={tableChartOptions.options}
          series={[item.profileCompletionPercentage]}
          type={tableChartOptions.type}
          height={tableChartOptions.height}
          width={tableChartOptions.width}
        />
      </td>
      <td className="px-0 " style={{ width: "100px" }}>
        <Badge
          color={item.active == "True" ? "light-primary" : "light-danger"}
          className="me-1"
        >
          {item.active == "True" ? "فعال" : "غیرفعال"}
        </Badge>
      </td>
      <td style={{ width: "100px" }} className="px-0">
        <UncontrolledDropdown direction="start">
          <DropdownToggle
            className="icon-btn hide-arrow"
            color="transparent"
            size="sm"
            caret
          >
            <MoreVertical size={15} />
          </DropdownToggle>
          <DropdownMenu className="d-flex flex-column p-0">
            <DropdownItem
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate("/users/view/" + item.id);
              }}
            >
              <FileText className="me-50" size={15} />{" "}
              <span className="align-middle">جزئیات</span>
            </DropdownItem>
            <DropdownItem
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleDeleteUser(item.id);
              }}
            >
              <Trash className="me-50" size={15} />{" "}
              <span className="align-middle">حذف</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
    </tr>
  );
};

export default TableItems;
