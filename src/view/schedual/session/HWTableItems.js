import ChangeMoment from "../../../utility/moment";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { Edit, FileText, MoreVertical } from "react-feather";

const HWTableItems = ({ item }) => {
  return (
    <tr className="text-center">
      <td className="px-0" style={{ width: "130px" }}>
        {item.hwTitle}
      </td>
      <td className="px-0" style={{ width: "200px" }}>
        {item.hwDescribe}
      </td>
      <td className="px-0" style={{ width: "120px" }}>
        {ChangeMoment(item.insertDate, "YYYY/MM/DD", "persian")}
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
              <FileText className="me-50" size={15} />{" "}
              <span className="align-middle">تکلیف</span>
            </DropdownItem>
            <DropdownItem
              href="/"
              onClick={(e) => {
                e.preventDefault();
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

export default HWTableItems;
