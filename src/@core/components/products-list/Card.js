// ** Third Party Components
import classnames from "classnames";
import { Star, Calendar, Eye, Activity } from "react-feather";
import { Link } from "react-router-dom";

// ** Reactstrap Imports
import { Card, CardBody } from "reactstrap";
import { UnitPrice } from "../../../utility/separation-price";
import ImageFallBack from "../image-fallback";
import ChangeStatusButton from "./ChangeStatusButton";

const ProductCards = (props) => {
  // Params
  const {
    href,
    id,
    image,
    currentRate,
    title,
    miniDescribe,
    insertDate,
    currentView,
    price,
    handleActiveOrDetective,
    status,
    fallback
  } = props;

  // ** Renders products
  return (
    <Card className="ecommerce-card relative">
      <ChangeStatusButton
        handleActiveOrDetective={handleActiveOrDetective}
        id={id}
        status={status}
      />
      <Link to={href + id}>
        <div
          className="item-img text-center p-0"
          style={{ height: "200px", width: "100%" }}
        >
          <ImageFallBack
            className="img-fluid card-img-top w-100 h-100"
            src={image}
            fallback={fallback}
          />
        </div>
      </Link>
      <CardBody>
        <Link to={href + id}>
          {currentRate !== null ? (
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
          ) : null}
          <h4 className="item-name mt-75">{title}</h4>
          <p className="item-description fs-5">{miniDescribe}</p>
          <hr />
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <Calendar size={18} color="#716c83" />
              <h6 style={{ marginTop: "2px", marginBottom: "0" }}>
                {insertDate}
              </h6>
            </div>
            {currentView || currentView == 0 ? (
              <div>
                <span style={{ marginLeft: "6px", color: "#716c83" }}>
                  {currentView}
                </span>
                <Eye size={18} color="#716c83" />
              </div>
            ) : (
              <div style={{ color: "#716c83" }}>
                <span style={{ marginLeft: "6px", color: "#5751E1" }}>
                  {UnitPrice(price)}
                </span>
                تومان
              </div>
            )}
          </div>
        </Link>
      </CardBody>
    </Card>
  );
};

export default ProductCards;
