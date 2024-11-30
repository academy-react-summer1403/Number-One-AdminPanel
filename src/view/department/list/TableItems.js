import { Edit } from "react-feather";
import ChangeMoment from "../../../utility/moment";

const TableItems = ({ item, toggleModal, setId }) => {
  return (
    <tr className="text-center">
      <td className="px-0" style={{ width: "80px" }}>
        {item.id} #
      </td>
      <td className="px-0" style={{ width: "280px" }}>
        {item.depName}
      </td>
      <td className="px-0" style={{ width: "130px" }}>
        {ChangeMoment(item.insertDate, "YYYY/MM/DD", "persian")}
      </td>
      <td className="px-0" style={{ width: "280px" }}>
        {item.buildingName}
      </td>
      <td
        onClick={() => {
          toggleModal();
          setId(item.id);
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
