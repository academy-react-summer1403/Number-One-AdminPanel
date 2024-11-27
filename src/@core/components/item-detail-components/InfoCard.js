// ** React Imports
import { Fragment, useState } from "react";

// ** Reactstrap Imports
import { Badge, Button, Card, CardBody } from "reactstrap";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";

// Customize
// import AddCategoryModal from "../../@core/components/DetailCourse/modal/AddCategoryModal";
import fallback from "../../../assets/images/portrait/small/image-not-found.png";
import ImageFallBack from "../image-fallback";

const MySwal = withReactContent(Swal);

const InfoCard = ({
  setEditModal,
  activeOrDeactive,
  fields,
  detailParams,
  variant,
  refetch,
  renderImageSection,
}) => {
  const [addTechModal, setAddTechModal] = useState(false);
  const toggle = () => setAddTechModal(!addTechModal);

  const handleSuspendedClick = (bolian) => {
    return MySwal.fire({
      title: "آیا مطمعن هستید؟",
      text: "البته امکان بازگشت نیز وجود دارد ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: " بله ",
      cancelButtonText: " لغو ",

      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        activeOrDeactive(bolian);
        MySwal.fire({
          icon: "success",
          title: "موفقیت ",
          text: "عملیات با موفقیت انجام گردید",
          confirmButtonText: " باشه ",

          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: "لغو",
          text: "عملیات لغو شد :)",
          icon: "error",
          confirmButtonText: " باشه ",

          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  };

  const imgVariant = {
    blog: detailParams?.currentImageAddressTumb,
    course: detailParams?.imageAddress,
    shop: detailParams?.img,
    products: detailParams?.pictureList?.[0]?.href,
  };

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="user-avatar-section mb-2">
            <div className=" d-flex align-items-center flex-column">
              {renderImageSection ? (
                renderImageSection()
              ) : (
                <ImageFallBack
                  className="img-fluid rounded mb-1"
                  style={{ height: "280px", width: "100%" }}
                  fallback={fallback}
                  src={imgVariant?.[variant]}
                />
              )}
              <div className="d-flex flex-column align-items-center text-center ">
                <div className="user-info">
                  <h4 className="fs-2 mb-2">
                    {" "}
                    {detailParams?.title || detailParams?.name}{" "}
                  </h4>
                  <Badge
                    color={
                      detailParams?.isActive || detailParams?.active
                        ? "light-primary"
                        : "light-danger"
                    }
                  >
                    {detailParams?.isActive || detailParams?.active
                      ? "فعال"
                      : "غیرفعال"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          <div className="divider divider-start">
            <div className="divider-text fs-2">جزئیات</div>
          </div>
          <div className="info-container">
            <ul className="list-unstyled">
              {fields?.map((item, index) => (
                <li key={index} className="mb-75">
                  <span className="fw-bolder me-25">{item.label}:</span>
                  <span> {item.value} </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="d-flex justify-content-center pt-2">
            <Button color="primary" onClick={() => setEditModal((old) => !old)}>
              ویرایش
            </Button>
            <Button
              className="ms-1"
              color="danger"
              outline
              onClick={() =>
                handleSuspendedClick(
                  detailParams?.isActive || detailParams?.active ? false : true
                )
              }
            >
              {detailParams?.isActive || detailParams?.active
                ? "غیر فعال کردن"
                : "فعال کردن"}
            </Button>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default InfoCard;
