// ** React Imports
import { useState } from "react";
import { useParams } from "react-router-dom";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** User View Components
import UserTabs from "./Tabs";
import UserInfoCard from "./UserInfoCard";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { handleDetails } from "../store/UserInfoSlice";

// Api
import { UserDetails } from "../../../@core/services/api/get-api";
import { UpdateUser } from "../../../@core/services/api/put-api";
import { useMutation } from "@tanstack/react-query";
import { useQueryWithDependencies } from "../../../utility/hooks/useCustomQuery";

// ** Styles
import "@styles/react/apps/app-users.scss";

const UserView = () => {
  const [active, setActive] = useState("1");
  const userDetails = useSelector((state) => state.UserInfoSlice.details);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  const { data, isSuccess, refetch } = useQueryWithDependencies(
    "GET_USER-DETAILS",
    UserDetails,
    null,
    id
  );
  if (isSuccess) {
    dispatch(handleDetails(data));
  }

  const { mutate } = useMutation({
    mutationKey: ["UPDATE_USER_DETAILS"],
    mutationFn: (values) => {
      const userInfo = {
        id: userDetails.id,
        fName: values.firstName,
        lName: values.lastName,
        userName: values.username,
        gmail: values.email,
        active: userDetails.active,
        nationalCode: values.nationalCode,
        phoneNumber: values.contact,
        isDelete: userDetails.isDelete ?? false,
        isTecher: userDetails.isTecher ?? false,
        isStudent: userDetails.isStudent ?? false,
        recoveryEmail: userDetails.recoveryEmail ?? "",
        twoStepAuth: userDetails.twoStepAuth ?? false,
        userAbout: userDetails.userAbout ?? "",
        currentPictureAddress: userDetails.currentPictureAddress ?? "",
        linkdinProfile: userDetails.linkdinProfile ?? "",
        telegramLink: userDetails.telegramLink ?? "",
        receiveMessageEvent: userDetails.receiveMessageEvent ?? "",
        homeAdderess: userDetails.homeAdderess ?? "",
        gender: values.gender,
        latitude: userDetails.latitude ?? "",
        longitude: userDetails.longitude ?? "",
        insertDate: userDetails.insertDate ?? undefined,
        birthDay: userDetails.birthDay ?? undefined,
        roles: userDetails.roles ?? [],
        courses: userDetails.courses ?? [],
        coursesReseves: userDetails.coursesReseves ?? [],
        userProfileId: userDetails.userProfileId ?? undefined,
      };
      UpdateUser(userInfo, refetch);
    },
    onSuccess: () => {
      setShow(false);
    },
  });

  return (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard
            submitUserUpdate={mutate}
            show={show}
            setShow={setShow}
            refetch={refetch}
          />
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserTabs
            active={active}
            toggleTab={toggleTab}
            userDetails={userDetails}
          />
        </Col>
      </Row>
    </div>
  );
};
export default UserView;
