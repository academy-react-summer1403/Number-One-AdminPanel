import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import ChangeMoment from "../../../utility/moment";
import { Activity, Edit, MoreVertical } from "react-feather";
import { GetGroupDetails } from "../../../@core/services/api/get-api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleDetailGroup } from "../store";

// console.log(item)
const TableItems = ({ item, toggleModal, toggleSession,setVariantState, setId }) => {
  const [existedGroup, setExistedGroup] = useState();
  const DetailGroup = useSelector((state) => state.SchedualSlice.DetailGroup);
  const dispatch = useDispatch();

  const handleGet = async () => {
    const group = await GetGroupDetails(item.courseGroupId);
    if (group) {
      let details = {
        groupName: group?.courseGroupDto?.groupName,
        groupId: group?.courseGroupDto?.groupId,
      };
      dispatch(handleDetailGroup(details));
    }
  };

  useEffect(() => {
    let exist = DetailGroup.find((ev) => ev.groupId === item.courseGroupId);
    if (exist) {
      setExistedGroup(exist);
    } else {
      handleGet();
    }
  }, [item]);

  return (
    <tr className="text-center">
      <td className="px-1" style={{ width: "180px" }}>
        {existedGroup ? existedGroup.groupName : ""}
      </td>
      <td className="px-1" style={{ width: "130px" }}>
        {item.startTime} تا {item.endTime}
      </td>
      <td className="px-1" style={{ width: "80px" }}>
        {item.weekNumber}
      </td>
      <td className="px-1" style={{ width: "120px" }}>
        {ChangeMoment(item.startDate, "YYYY/MM/DD", "persian")}
      </td>
      <td className="px-1" style={{ width: "150px" }}>
        <Badge color={item.forming ? "success" : "danger"}>
          {item.forming ? "تشکیل شده" : "تشکیل نشده"}
        </Badge>
      </td>
      <td className="px-1" style={{ width: "100px" }}>
        <Badge color={item.lockToRaise ? "success" : "danger"}>
          {item.lockToRaise ? "می تواند" : "نمی تواند"}
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
                setId(item.id);
                toggleSession();
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
                setVariantState("update");
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
