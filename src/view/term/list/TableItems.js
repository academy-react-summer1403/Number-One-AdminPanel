import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import ChangeMoment from "../../../utility/moment";
import { Edit, MoreVertical } from "react-feather";

const TableItems = ({ item, toggleModal, setId, addCloseDateModal }) => {
  return (
    <tr className="text-center">
      <td className="px-0" style={{ width: "80px" }}>
        {item.id} #
      </td>
      <td className="px-0" style={{ width: "280px" }}>
        {item.termName}
      </td>
      <td className="px-0" style={{ width: "180px" }}>
        {ChangeMoment(item.startDate, "YYYY/MM/DD", "persian")} تا{" "}
        {ChangeMoment(item.endDate, "YYYY/MM/DD", "persian")}
      </td>
      <td className="px-0" style={{ width: "280px" }}>
        {item.departmentName}
      </td>
      <td className="px-0 " style={{ width: "80px" }}>
        <Badge
          color={!item.expire ? "light-primary" : "light-danger"}
          className="me-1"
        >
          {item.expire ? "منقضی شده" : "منقضی نشده"}
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
                toggleModal();
                setId(item.id);
              }}
            >
              <Edit className="me-50" size={15} />{" "}
              <span className="align-middle">ویرایش</span>
            </DropdownItem>
            <DropdownItem
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setId(item.id);
                addCloseDateModal()
              }}
            >
              تاریخ بسته شدن
            </DropdownItem>
            {/* <DropdownItem
              href="/"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              ویرایش تاریخ بسته شدن
            </DropdownItem> */}
          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
    </tr>
  );
};

export default TableItems;
