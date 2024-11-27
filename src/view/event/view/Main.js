// ** React Imports
import { Fragment } from "react";

// ** Custom Components
import ImageFallback from "../../../@core/components/image-fallback";
import Avatar from "@components/avatar";
import Breadcrumbs from "@components/breadcrumbs";
import Sidebar from "./Sidebar";
import fallback from "../../../assets/images/portrait/small/image-not-found.png";
import { UnitPrice } from "../../../utility/separation-price";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Badge,
  Button,
  CardBody,
  CardTitle,
} from "reactstrap";

// ** Styles
import "@styles/base/pages/page-blog.scss";

// ** Images
import cmtImg from "@src/assets/images/portrait/small/avatar-s-6.jpg";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";

// Api
import { UpdateEvent } from "../../../@core/services/api/put-api";

const MySwal = withReactContent(Swal);

const EventMain = ({ data, refetch, setEditModal }) => {

  const { mutate } = useMutation({
    mutationKey: ["ACTIVE_AND_DETECTIVE"],
    mutationFn: (boolean) => {
      UpdateEvent(data.id, { isActive: boolean }, refetch);
    },
  });

  const handleSuspendedClick = (boolean) => {
    return MySwal.fire({
      title: "آیا از این اقدام مطمعن هستید؟",
      text: "البته امکان بازگشت نیز وجود دارد",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        mutate(boolean);
        MySwal.fire({
          icon: "success",
          title: "موفقیت ",
          text: "عملیات با موفقیت انجام شد",
          confirmButtonText: "باشه",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: "لغو شد",
          text: "اقدام مورد نظر لغو شد",
          icon: "error",
          confirmButtonText: " باشه ",

          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  };

  return (
    <Fragment>
      {/* <Breadcrumbs
        title="جزییات ایونت"
        data={[{ title: "ایونت" }, { title: "جزییات" }]}
      /> */}
      <div className="blog-wrapper">
        <div className="content-detached content-left">
          <div className="content-body">
            {data !== null ? (
              <Row>
                <Col sm="12">
                  <Card className="mb-3">
                    <ImageFallback
                      src={data.currentImageAddressTumb}
                      style={{ height: "305px" }}
                      fallback={fallback}
                      className="img-fluid"
                    />
                    <CardBody>
                      <CardTitle tag="h4">{data.title}</CardTitle>
                      <div className="d-flex align-items-center">
                        <Avatar
                          className="me-50"
                          img={cmtImg}
                          imgHeight="24"
                          imgWidth="24"
                        />
                        <div>
                          <small className="text-muted me-25">توسط</small>
                          <small>
                            <a
                              className="text-body"
                              href="/"
                              onClick={(e) => e.preventDefault()}
                            >
                              {data.addUserFullName}
                            </a>
                          </small>
                          <span className="text-muted ms-50 me-25">|</span>
                          <small className="text-muted">
                            {data.startEventTime}
                          </small>
                        </div>
                      </div>
                      <div className="my-1 py-25">
                        <Badge
                          color={
                            data.isActive ? "light-primary" : "light-danger"
                          }
                          pill
                        >
                          {data.isActive ? "فعال" : "غیر فعال"}
                        </Badge>
                      </div>
                      <div
                        className="mb-1"
                        dangerouslySetInnerHTML={{
                          __html: data.miniDescribe,
                        }}
                      ></div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: data.describe,
                        }}
                      ></div>
                      <hr className="my-2" />
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <Button
                            color="primary"
                            onClick={() => setEditModal((old) => !old)}
                          >
                            ویرایش
                          </Button>
                          <Button
                            className="ms-1"
                            color="danger"
                            outline
                            onClick={() =>
                              handleSuspendedClick(data.isActive ? false : true)
                            }
                          >
                            {data.isActive ? "غیر فعال کردن" : "فعال کردن"}
                          </Button>
                        </div>
                        <div className="fs-3" style={{ color: "#5751E1" }}>
                          {UnitPrice(data.price)} تومان
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            ) : null}
          </div>
        </div>
        <Sidebar />
      </div>
    </Fragment>
  );
};

export default EventMain;
