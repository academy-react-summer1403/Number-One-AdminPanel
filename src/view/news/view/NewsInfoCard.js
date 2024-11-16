// ** React Imports
import { Fragment } from "react";
import { useSelector } from "react-redux";

// Image
import fallback from "../../../assets/images/portrait/small/image-not-found.png";

// ** Reactstrap Imports
import { Badge, Button, Card, CardBody } from "reactstrap";

// Alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";

// Custom Component
import ImageFallBack from "../../../@core/components/image-fallback";

const MySwal = withReactContent(Swal);

const NewsInfoCard = ({ setEditModal, activeOrDeactive }) => {
  const detail = useSelector((state) => state.NewsDetail.newsDetails);

  // Active or Deactive
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

  // Fields
  const detailItems = [
    { label: "نویسنده", value: detail?.addUserFullName },
    { label: "دسته بندی", value: detail?.newsCatregoryName },
    { label: "توضیحات کلی", value: detail?.miniDescribe },
    { label: "عنوان گوگل", value: detail?.googleTitle },
    { label: "تاریخ ایجاد", value: detail?.insertDate?.slice(0, 10) },
    { label: "تاریخ بروز رسانی", value: detail?.updateDate?.slice(0, 10) },
  ];

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="user-avatar-section mb-2">
            <div className=" d-flex align-items-center flex-column">
              <ImageFallBack
                style={{ height: "280px", width: "100%" }}
                className="img-fluid rounded mb-1"
                src={detail.currentImageAddressTumb}
                fallback={fallback}
              />
              <div className="d-flex flex-column align-items-center text-center ">
                <div className="user-info">
                  <h4 className="fs-2 mb-2"> {detail.title} </h4>
                  <Badge
                    color={detail.active ? "light-primary" : "light-danger"}
                  >
                    {detail.active ? "فعال" : "غیرفعال"}
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
              {detailItems.map((item, index) => (
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
              onClick={() => handleSuspendedClick(detail.active ? false : true)}
            >
              {detail.active ? "غیر فعال کردن" : "فعال کردن"}
            </Button>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default NewsInfoCard;
