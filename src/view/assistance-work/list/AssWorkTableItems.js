import { Button } from "reactstrap";
import ChangeMoment from "../../../utility/moment";

const AssWorkTableItems = ({ item, setId, toggle }) => {
  return (
    <tr className="text-center" style={{ whiteSpace: "nowrap" }}>
      <td className="px-0" style={{ width: "240px" }}>
        {item.courseName}
      </td>
      <td className="px-0" style={{ width: "240px" }}>
        {item.assistanceName}
      </td>
      <td className="px-0" style={{ width: "150px" }}>
        {ChangeMoment(item.inserDate, "YYYY/MM/DD", "persian")}
      </td>
      <td>
        <Button
          className="p-0 py-1 text-center bg-black"
          style={{ width: "120px", float: "left" }}
          color="primary"
          onClick={() => {
            toggle();
            setId(item.id);
          }}
        >
          <span className="mx-auto">انتخاب</span>
        </Button>
      </td>
    </tr>
  );
};

export default AssWorkTableItems;
