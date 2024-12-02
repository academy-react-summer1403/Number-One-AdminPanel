import { Button } from "reactstrap";
import Avatar from "@components/avatar";
import avatarImg from "@src/assets/images/portrait/small/ee.jpg";
import avatarMenImg from "@src/assets/images/portrait/small/jpmen.jpg";

const UserTableItems = ({ toggle, item, setId }) => {
  return (
    <tr className="text-center" style={{ whiteSpace: "nowrap" }}>
      <td style={{ width: "100px" }} className="px-0">
        {item.gender ? (
          <Avatar img={avatarMenImg} />
        ) : (
          <Avatar img={avatarImg} />
        )}
      </td>
      <td className="px-0">
        {item?.fname} {item?.lname}
      </td>
      <td className="px-0">{item?.gmail}</td>
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

export default UserTableItems;
