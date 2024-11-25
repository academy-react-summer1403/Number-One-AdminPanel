// ** React Imports
import { useEffect, useState } from "react";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** User View Components

// ** Styles
import "@styles/react/apps/app-users.scss";
import { useLocation, useParams } from "react-router-dom";
// import {
//   GetCourseGroups,
// } from "../../../../core/services/api/get-api";
import { useDispatch, useSelector } from "react-redux";
// import {
//   getCourseComments,
//   getCourseDetails,
// } from "../../../../redux/slices/CourseDetail";
// import EditCourse from "../modal/EditCourse";
// import ModalBasic from "../modal/ModalBasic";
// import ChangeReserve from "../../../../core/services/api/post-api/ChangeUserChange";
// import ModalGroup from "../modal/ModalGroupe";
// import { useQuery } from "@tanstack/react-query";
import InfoCard from "./InfoCard";
import { CoursesInfo } from "../../../@core/constants/courses";
import { GetCourseById } from "../../../@core/services/api/get-api";
import { useQueryWithDependencies } from "../../../utility/hooks/useCustomQuery";
import { ActiveOrDeActive } from "../../../@core/services/api/put-api";
import EditCourse from "./EditCourse";

const CourseDetail = () => {

  //   // **useParams
  const { id } = useParams();
  const dispatch = useDispatch();
  const [editModal, setEditModal] = useState(false);
  const [centeredModal, setCenteredModal] = useState(false);
  const [refetchChange, setRefetchChange] = useState(false);
  const [userSel, setUserSel] = useState([]);
  // const detailsParams = useSelector(
  //   (state) => state.CourseDetail.courseDetails
  // );
  const {
    data: detailsData,
    refetch,
    isSuccess,
  } = useQueryWithDependencies("GET_COURSE_DETAILS", GetCourseById, id, id);
  // const { data: groupData, refetch: refetchGroup } = useQuery({
  //   queryKey: ["GET_COURSE_GROUPS", isSuccess],
  //   queryFn: () => {
  //     return GetCourseGroups({
  //       teacherId: detailsData?.teacherId,
  //       courseId: id,
  //     });
  //   },
  //   enabled: !!(detailsData?.teacherId !== undefined),
  // });

  const location = useLocation();
  const [active, setActive] = useState("1");

  useEffect(() => {
    if (location?.state !== null) {
      setActive(location.state.tab);
    }
  }, []);

  const activeOrDeActive = async () => {
    try {
      const data = {
        active: detailsData.isActive ? false : true,
        id: detailsData.courseId,
      };
      const responses = await ActiveOrDeActive(data, refetch);
    } catch (error) {
      throw new Error("ERROR: ", error);
    }
  };

  // const handleChangeReserve = async (groupId) => {
  //   try {
  //     const data = {
  //       courseId: userSel.courseId,
  //       courseGroupId: groupId,
  //       studentId: userSel.studentId,
  //     };
  //     const result = await ChangeReserve(data);
  //     if (result.success) {
  //       setRefetchChange(!refetchChange);
  //     }
  //   } catch (error) {
  //     throw new Error("ERROR: ", error);
  //   }
  // };

  // **API
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  const toggle = () => setEditModal(!editModal);

  return (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 0 }} md={{ order: 0, size: 5 }}>
          <InfoCard
            setEditModal={setEditModal}
            editModal={editModal}
            activeOrDeactive={activeOrDeActive}
            fields={CoursesInfo(isSuccess && detailsData)}
            detailParams={detailsData}
            variant={"course"}
            refetch={refetch}
          />
        </Col>
        <EditCourse isOpen={editModal} toggle={toggle} refetchData={refetch}/>
        {/* <Col xl="8" lg="7" xs={{ order: 1 }} md={{ order: 1, size: 7 }}>
          <UserTabs
            active={active}
            toggleTab={toggleTab}
            data={detailsData}
            centeredModal={centeredModal}
            setCenteredModal={setCenteredModal}
            refetchChange={refetchChange}
            refetchGroup={refetchGroup}
            groupData={groupData}
            setUserSel={setUserSel}
          />
        </Col> */}
      </Row>
      {/* <ModalBasic
        centeredModal={centeredModal}
        setCenteredModal={setCenteredModal}
        groupData={groupData}
        id={id}
        changeReserve={handleChangeReserve}
        // setModalGr={setModalGr}
        toggleTab={toggleTab}
      /> */}
    </div>
  );
};
export default CourseDetail;
