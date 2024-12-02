import { Edit } from "react-feather";
import ChangeMoment from "../../../utility/moment";

const TableItems = ({ item, toggleModal, setId }) => {
  return (
    <tr className="text-center">
      <td className="px-0" style={{ width: "180px" }}>
        {item.worktitle}
      </td>
      <td className="px-0" style={{ width: "280px" }}>
        {item.workDescribe}
      </td>
      <td className="px-0" style={{ width: "100px" }}>
        {ChangeMoment(item.workDate, "YYYY/MM/DD", "persian")}
      </td>
      <td className="px-0" style={{ width: "280px" }}>
        {item.courseName}
      </td>
      <td className="px-0" style={{ width: "130px" }}>
        {item.assistanceName}
      </td>
      <td
        onClick={() => {
          toggleModal();
          setId(item.workId);
        }}
        className="px-0"
        style={{ width: "130px" }}
      >
        <Edit size={18} />
        <span className="mx-75">ویرایش</span>
      </td>
    </tr>
  );
};

export default TableItems;
