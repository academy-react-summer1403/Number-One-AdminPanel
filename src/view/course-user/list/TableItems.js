import { useState } from "react";
import { Badge } from "reactstrap";
import { GetGroupDetails } from "../../../@core/services/api/get-api";
import { useEffect } from "react";

const TableItems = ({ item }) => {
  const [existedGroup, setExistedGroup] = useState();
  const [DetailGroup, setDetailGroup] = useState([]);

  const handleGet = async () => {
    const group = await GetGroupDetails(item.courseGroupId);
    if (group) {
      let details = {
        groupName: group?.courseGroupDto?.groupName,
        groupId: group?.courseGroupDto?.groupId,
      };
      setDetailGroup(details);
      setExistedGroup(details);
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
      <td className="px-0" style={{ width: "180px" }}>
        {existedGroup ? existedGroup.groupName : ""}
      </td>
      <td className="px-0" style={{ width: "200px" }}>
        {item.studentName}
      </td>
      <td className="px-0" style={{ width: "120px" }}>
        {item.courseGrade}
      </td>
      <td className="px-0" style={{ width: "120px" }}>
        {item.peymentDone ? (
          <Badge color="success" className="me-1">
            پرداخت شده
          </Badge>
        ) : (
          <Badge color="danger" className="me-1">
            پرداخت نشده
          </Badge>
        )}
      </td>
      <td className="px-0" style={{ width: "120px" }}>
        {item.isDelete ? (
          <Badge color="success" className="me-1">
            بله
          </Badge>
        ) : (
          <Badge color="danger" className="me-1">
            خیر
          </Badge>
        )}
      </td>
      <td className="px-0" style={{ width: "120px" }}>
        {item.notification ? (
          <Badge color="success" className="me-1">
            فعال
          </Badge>
        ) : (
          <Badge color="danger" className="me-1">
            غیر فعال
          </Badge>
        )}
      </td>
    </tr>
  );
};

export default TableItems;
