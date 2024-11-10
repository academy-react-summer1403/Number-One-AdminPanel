// ** React Imports
import { useState, Fragment } from "react";

// ** Reactstrap Imports
import { Card, CardBody, Button, Badge, Tooltip } from "reactstrap";

// ** Third Party Components
import Swal from "sweetalert2";
import { Check, Briefcase, X, Edit } from "react-feather";
import withReactContent from "sweetalert2-react-content";

// ** Images
import avatarImg from "@src/assets/images/portrait/small/ee.jpg";
import avatarMenImg from "@src/assets/images/portrait/small/jpmen.jpg";

// ** Custom Components
import EditUserInfo from "./EditUserInfo";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";

// Api
import { DeleteUser } from "../../../@core/services/api/delete-api";
import { ReverseToActiveUser } from "../../../@core/services/api/put-api";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";

import UserAddRole from "../../DetailCourse/addRoll/UserAddRole";

const MySwal = withReactContent(Swal);

const UserInfoCard = ({ submitUserUpdate, setShow, show, refetch }) => {
  const [modal, setModal] = useState(null);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const userDetails = useSelector((state) => state.UserInfoSlice.details);

  // Get User Course Reserved Length
  const courseReserve = userDetails?.coursesReseves?.filter((item) => {
    return item.accept == false;
  });

  const handleAddRoleModal = () => {
    toggleModal(userDetails.id);
  };

  const toggleModal = (id) => {
    if (modal !== id) setModal(id);
    else setModal(null);
  };

  // Handle Delete
  const { mutate: handleDeleteUser } = useMutation({
    mutationKey: ["DELETE_USER"],
    mutationFn: (id) => {
      DeleteUser(id);
    },
  });

  // Handle Active User
  const { mutate: handleActiveUser } = useMutation({
    mutationKey: ["ACTIVE_USER"],
    mutationFn: (id) => {
      ReverseToActiveUser(id);
    },
  });

  const handleUnSuspended = async (id) => {
    return MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Suspend user!",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        handleActiveUser(id);
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: "Cancelled",
          text: "Cancelled Suspension :)",
          icon: "error",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  };

  const handleSuspended = async (id) => {
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
        handleDeleteUser(id);
        MySwal.fire({
          icon: "error",
          title: "نا موفق!",
          text: "فقط ادمین اصلی سیتم میتواند این عملیات را انجام دهد ",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: "لغو گردید",
          text: "عملیات لغو گردیده است:)",
          icon: "error",
          confirmButtonText: " بستن ",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  };

  const infoItems = [
    { label: "نام کاربری:", value: userDetails.userName },
    { label: "ایمیل:", value: userDetails.gmail },
    {
      label: "وضعیت:",
      value: userDetails.active != false ? "فعال" : "غیرفعال",
    },
    {
      label: "جنسیت:",
      value: userDetails.gender && userDetails.gender === true ? "مرد" : "زن",
    },
    { label: "کدملی:", value: userDetails.nationalCode },
    { label: "شماره موبایل:", value: userDetails.phoneNumber },
  ];

  const courseInfo = [
    { icon: Check, label: "دوره ها", value: userDetails?.courses?.length },
    {
      icon: Briefcase,
      label: "دوره های رزرو شده",
      value: courseReserve?.length,
    },
  ];

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="user-avatar-section">
            <div className=" d-flex align-items-center flex-column">
              <img
                height="100"
                width="100"
                src={
                  userDetails.currentPictureAddress != null &&
                  userDetails.currentPictureAddress != "Not-set"
                    ? userDetails.currentPictureAddress
                    : userDetails.gender
                    ? avatarMenImg
                    : avatarImg
                }
                className="img-fluid rounded-4 mb-2"
              />
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  <h4>
                    {userDetails.fName} {userDetails.lName}
                  </h4>
                  <div className="gap-1 d-flex flex-wrap mt-1">
                    {userDetails.roles &&
                      userDetails.roles.map((item, index) => {
                        return (
                          <Badge
                            onClick={handleAddRoleModal}
                            key={index}
                            color="light-primary"
                            className="text-capitalize cursor-pointer"
                          >
                            {item.roleName}
                          </Badge>
                        );
                      })}
                    <Edit
                      onClick={handleAddRoleModal}
                      style={{ width: "18px", height: "18px" }}
                      className="cursor-pointer"
                      id="gi"
                    />{" "}
                    <Tooltip
                      placement="bottom"
                      isOpen={tooltipOpen}
                      toggle={() => setTooltipOpen(!tooltipOpen)}
                      target="gi"
                      innerClassName="table-tooltip"
                    >
                      {" "}
                      افزودن نقش
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-around my-2 pt-75">
            {courseInfo.map((item, index) => (
              <div key={index} className="d-flex align-items-start me-2">
                <Badge color="light-primary" className="rounded p-75">
                  <item.icon className="font-medium-2" />
                </Badge>
                <div className="ms-75">
                  <h4 className="mb-0">{item.value}</h4>
                  <small>{item.label}</small>
                </div>
              </div>
            ))}
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">جزئیات</h4>
          <div className="info-container">
            {userDetails !== null ? (
              <ul className="list-unstyled">
                {infoItems.map((item, index) => (
                  <li key={index} className="mb-75">
                    <span className="fw-bolder me-25">{item.label}</span>
                    <span>{item.value}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className="d-flex justify-content-center pt-2">
            <Button color="primary" onClick={() => setShow(true)}>
              ویرایش
            </Button>
            {userDetails.active && userDetails.active !== false ? (
              <Button
                className="ms-1"
                color="danger"
                outline
                value={userDetails.id}
                onClick={(e) => handleSuspended(e.target.value)}
              >
                غیرفعال کردن
              </Button>
            ) : (
              <Button
                className="ms-1"
                color="warning"
                outline
                value={userDetails.id}
                onClick={(e) => handleUnSuspended(e.target.value)}
              >
                فعال کردن
              </Button>
            )}
          </div>
        </CardBody>
      </Card>
      <EditUserInfo
        show={show}
        setShow={setShow}
        submitUserUpdate={submitUserUpdate}
        refetch={refetch}
      />
      <UserAddRole
        modal={modal}
        id={userDetails.id}
        userName={userDetails.fname + " " + userDetails.lname}
        toggleModal={toggleModal}
        userRoles={userDetails.roles}
        refetch={refetch}
      />
    </Fragment>
  );
};

export default UserInfoCard;
