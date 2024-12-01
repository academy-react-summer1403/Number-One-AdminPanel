import { Edit } from "react-feather";
import ChangeMoment from "../../../../../utility/moment";

const TableItems = ({ toggle, setAccId, item }) => {
  return (
    <tr className="text-center">
      <td className="px-0" style={{ width: "80px" }}>
        {item.userId}
      </td>
      <td className="px-0" style={{ width: "180px" }}>
        {item.assistanceName ? item.assistanceName : "ناشناس"}
      </td>
      <td className="px-0" style={{ width: "100px" }}>
        {ChangeMoment(item.inserDate, "YYYY/MM/DD", "persian")}
      </td>
      <td
        onClick={() => {
          setAccId(item.id);
          toggle();
        }}
        className="px-0"
        style={{ width: "100px" }}
      >
        <Edit size={17} className="mx-75" />
        ویرایش
      </td>
    </tr>
  );
};

export default TableItems;
