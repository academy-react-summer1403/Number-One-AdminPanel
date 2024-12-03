import { Edit, FileText, MoreVertical } from "react-feather";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import ChangeMoment from "../../../utility/moment";

const SessionTableItems = ({ item, refetch, toggleHW, toggleEdit, setId }) => {
  return (
    <tr className="text-center">
      <td className="px-0" style={{ width: "180px" }}>
        {item.sessionTitle}
      </td>
      <td className="px-0" style={{ width: "300px" }}>
        {item.sessionDescribe}
      </td>
      <td className="px-0" style={{ width: "100px" }}>
        {item.schedualStartTime}
      </td>
      <td className="px-0" style={{ width: "100px" }}>
        {item.schedualEndTime}
      </td>
      <td className="px-0" style={{ width: "120px" }}>
        {ChangeMoment(item.insertDate, "YYYY/MM/DD", "persian")}
      </td>
      <td className="px-0" style={{ width: "150px" }}>
        <Badge color={item.forming ? "success" : "danger"}>
          {item.forming ? "تشکیل شده" : "تشکیل نشده"}
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
                setId(item.scheduleSessionId);
                toggleHW();
              }}
            >
              <FileText className="me-50" size={15} />{" "}
              <span className="align-middle">تکلیف</span>
            </DropdownItem>
            <DropdownItem
              href="/"
              onClick={(e) => {
                e.preventDefault();
                toggleEdit();
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

export default SessionTableItems;
