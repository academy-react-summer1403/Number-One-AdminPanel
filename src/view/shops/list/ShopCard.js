// ** Third Party Components
import classnames from "classnames";
import { Star, Calendar, Eye, Clock } from "react-feather";
import { Link } from "react-router-dom";
import Avatarrr from "../../../assets/images/cards/22.png";

// ** Reactstrap Imports
import { Badge, Card, CardBody } from "reactstrap";

const ShopCard = (props) => {
  const {
    id,
    image,
    currentRate,
    title,
    aboutUs,
    category,
    startTime,
    endTime,
    href,
  } = props;

  return (
    <Card className="ecommerce-card">
      <Link to={href + id}>
        <div
          className="item-img text-center p-0"
          style={{ height: "200px", width: "100%" }}
        >
          <img
            className="img-fluid card-img-top w-100 h-100"
            src={image == null || image == "undefined" ? Avatarrr : image}
          />
        </div>
      </Link>
      <CardBody>
        <Link to={href + id}>
          {currentRate && (
            <div className="item-wrapper">
              <div className="item-rating">
                <ul className="unstyled-list list-inline">
                  {new Array(5).fill().map((listItem, index) => {
                    return (
                      <li key={index} className="ratings-list-item me-25">
                        <Star
                          className={classnames({
                            "filled-star": index + 1 <= currentRate,
                            "unfilled-star": index + 1 > currentRate,
                          })}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
          <h4 className="item-name mt-75">{title}</h4>
          <p className="item-description fs-5">{aboutUs}</p>
          <hr />
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <Clock size={16} color="#716c83" style={{ marginLeft: "2px" }} />
              <h6 style={{ marginTop: "2px", marginBottom: "0" }}>
                <span> {startTime}:00</span>
                <span> تا {endTime}:00 </span>
              </h6>
            </div>
            <div>
              <Badge color="secondary">{category}</Badge>
            </div>
          </div>
        </Link>
      </CardBody>
    </Card>
  );
};

export default ShopCard;
