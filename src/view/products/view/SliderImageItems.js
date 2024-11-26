import { Eye, EyeOff, Trash2 } from "react-feather";
import { Badge, Card, CardBody, CardHeader, CardImg } from "reactstrap";

const SliderImageItems = ({ src, isActive, ActiveFunc, id, DeleteFunc }) => {
  return (
    <Card className="w-100" style={{ height: "300px", cursor: "grabbing" }}>
      <CardHeader className="d-flex justify-content-between gap-2">
        <Badge
          color={isActive ? "light-primary" : "light-warning"}
          className="fs-5"
        >
          {isActive ? "فعال" : "غیر فعال"}
        </Badge>
        <div className="d-flex gap-75">
          <Trash2
            size={20}
            className="cursor-pointer"
            onClick={() => {
              DeleteFunc(id);
            }}
          />
          {isActive ? (
            <EyeOff
              size={20}
              className="cursor-pointer"
              onClick={() => {
                ActiveFunc(id);
              }}
            />
          ) : (
            <Eye
              size={20}
              className="cursor-pointer"
              onClick={() => {
                ActiveFunc(id);
              }}
            />
          )}
        </div>
      </CardHeader>
      <CardBody
        className="w-100"
        style={{ height: "235px", position: "relative" }}
      >
        <CardImg
          className="w-100 h-100"
          style={{ filter: !isActive && "grayscale(100%)" }}
          src={src}
        />
      </CardBody>
    </Card>
  );
};

export default SliderImageItems;
