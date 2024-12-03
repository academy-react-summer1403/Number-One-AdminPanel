import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import ChangeMoment from "../../../utility/moment";
import { Activity, Edit, MoreVertical } from "react-feather";

const TableItems = ({ item, toggleModal,setVariantState ,setId }) => {
  // console.log(item)
  return (
    <tr className="text-center">
      <td className="px-0" style={{ width: "180px" }}>
        {item.courseGroupId}
      </td>
      <td className="px-0" style={{ width: "130px" }}>
        {item.startTime}
      </td>
      <td className="px-0" style={{ width: "130px" }}>
        {item.endTime}
      </td>
      <td className="px-0" style={{ width: "100px" }}>
        {item.weekNumber}
      </td>
      <td className="px-0" style={{ width: "200px" }}>
        {ChangeMoment(item.startDate, "YYYY/MM/DD", "persian")} تا{" "}
        {ChangeMoment(item.endDate, "YYYY/MM/DD", "persian")}
      </td>
      <td className="px-0" style={{ width: "150px" }}>
        <Badge color={item.forming ? "success" : "danger"}>
          {item.forming ? "تشکیل شده" : "تشکیل نشده"}
        </Badge>
      </td>
      <td className="px-0" style={{ width: "150px" }}>
        <Badge color={item.forming ? "success" : "danger"}>
          {item.lockToRaise ? "می تواند شرکت کند" : "نمی تواند شرکت کند"}
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
              }}
            >
              <Activity className="me-50" size={15} />{" "}
              <span className="align-middle">نمایش جلسه</span>
            </DropdownItem>
            <DropdownItem
              href="/"
              onClick={(e) => {
                e.preventDefault();
                toggleModal();
                setVariantState("update")
                setId(item.id);
              }}
            >
              <Edit className="me-50" size={15} />{" "}
              <span className="align-middle">ویرایش</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
    </tr>
  );
};

export default TableItems;
