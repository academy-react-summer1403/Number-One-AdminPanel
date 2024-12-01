import { Button } from "reactstrap";
import ImageFallBack from "../../../../../@core/components/image-fallback";
import fallback from "../../../../../assets/images/portrait/small/image-not-found.png";

const CourseTableItems = ({ item, setId, toggle }) => {
  return (
    <tr className="text-center" style={{ whiteSpace: "nowrap" }}>
      <td style={{ width: "100px" }} className="px-0">
        <ImageFallBack
          src={item.tumbImageAddress}
          fallback={fallback}
          className="w-100 h-100"
          style={{ borderRadius: "15px" }}
        />
      </td>
      <td className="px-0" style={{ width: "280px" }}>
        {item.title}
      </td>
      <td className="px-0" style={{ width: "100px" }}>
        {item.isActive ? "فعال" : "غیر فعال"}
      </td>
      <td>
        <Button
          className="p-0 py-1 text-center bg-black"
          style={{ width: "120px", float: "left" }}
          color="primary"
          onClick={() => {
            toggle();
            setId(item.courseId);
          }}
        >
          <span className="mx-auto">انتخاب</span>
        </Button>
      </td>
    </tr>
  );
};

export default CourseTableItems;
