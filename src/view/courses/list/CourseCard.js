import classNames from "classnames";
import Avatar from "../../../assets/images/cards/44.jpg";
import { Badge, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { Calendar, ShoppingCart, Star, User } from "react-feather";
import HandleIdentityEditorJs from "../../../utility/create-editorjs-blocks/IdentityEditorJs";

const CourseCard = (props) => {
  const { activeView, item } = props;

  // ** Renders products
  const renderProducts = () => {
    if (item?.length) {
      return item.map((item, index) => (
        <Card className="ecommerce-card" key={index}>
          <Link to={`/courses/view/${item.courseId}`}>
            <div
              className="item-img text-center p-0"
              style={{ height: "200px", width: "100%" }}
            >
              <img
                className="img-fluid card-img-top w-100 h-100"
                src={
                  item.tumbImageAddress == null ||
                  item.tumbImageAddress == "undefined"
                    ? Avatar
                    : item.tumbImageAddress
                }
              />
            </div>
          </Link>
          <CardBody>
            <Link to={`/courses/view/${item.courseId}`}>
              <h4 className="mt-75 line-clamp">{item.title}</h4>
              <p className="item-description line-clamp ">
                {" "}
                <HandleIdentityEditorJs desc={item?.describe} />
              </p>
              <div className="d-flex justify-content-between">
                <div>
                  <User size={18} color="#716c83" />
                  <span style={{ color: "#716c83", marginRight: "4px" }}>
                    {item.fullName}
                  </span>
                </div>
                <div>
                  <span style={{ color: "#716c83", marginLeft: "4px" }}>
                    {item.reserveCount}
                  </span>
                  <ShoppingCart size={18} color="#716c83" />
                </div>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <Calendar size={18} color="#716c83" />
                  <h6
                    style={{
                      marginTop: "2px",
                      marginBottom: "0",
                      marginRight: "3px",
                    }}
                  >
                    {item?.lastUpdate.slice(0, 10)}
                  </h6>
                </div>
                <div>
                  <Badge
                    pill
                    color={
                      item.statusName === "شروع ثبت نام"
                        ? "light-primary"
                        : item.statusName === "درحال برگزاری"
                        ? "light-success"
                        : "light-warning"
                    }
                  >
                    {item.statusName}
                  </Badge>
                </div>
              </div>
            </Link>
          </CardBody>
        </Card>
      ));
    }
  };

  return (
    <>
      {item?.length ? (
        <div
          className={classNames({
            "grid-view": activeView === "grid",
            "list-view": activeView === "list",
          })}
        >
          {renderProducts()}
        </div>
      ) : (
        <div
          className=" mx-auto my-5 content-body"
          style={{
            textAlign: "center",
          }}
        >
          دوره ای وجود ندارد
        </div>
      )}
    </>
  );
};

export default CourseCard;
