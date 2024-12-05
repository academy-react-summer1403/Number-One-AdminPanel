import {
  Badge,
  Button,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import { SessionDetails } from "../../../@core/constants/session/HeaderTable";
import {
  useMutationWithRefetch,
  useQueryWithDependencies,
} from "../../../utility/hooks/useCustomQuery";
import { GetSessionDetail } from "../../../@core/services/api/get-api";
import { Fragment, useEffect, useState } from "react";
import HomeWorkModal from "./HWModal";
import AddUpdateSessionModal from "./AddUpdateSession";
import ChangeMoment from "../../../utility/moment";
import SessionButtons from "./SessionButtons";
import AddSessionFileModal from "./AddSessionFileModal";
// Slider
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Style
import "@styles/react/libs/swiper/swiper.scss";
import { DeleteSessionFile } from "../../../@core/services/api/delete-api";

const SessionModal = ({ id, isOpen, toggle }) => {
  const [sessId, setSessId] = useState();
  const [details, setDetails] = useState(undefined);
  const { data, isSuccess, refetch } = useQueryWithDependencies(
    "GET_SESSION",
    GetSessionDetail,
    id,
    id,
    id != undefined
  );
  // delete file session
  const { mutate } = useMutationWithRefetch("DELETE_FILE", DeleteSessionFile);

  // Home Works Modal
  const [HWModal, setHWModal] = useState(false);
  const toggleHWModal = () => setHWModal(!HWModal);

  // Add Session Modal
  const [addSessionModal, setAddSessionModal] = useState(false);
  const toggleAddSessionModal = () => setAddSessionModal(!addSessionModal);

  // Add Session file Modal
  const [addFileModal, setAddFileModal] = useState(false);
  const toggleAddFileModal = () => setAddFileModal(!addFileModal);

  // Update Session Modal
  const [updateSessionModal, setUpdateSessionModal] = useState(false);
  const toggleUpdateSessionModal = () =>
    setUpdateSessionModal(!updateSessionModal);
  useEffect(() => {
    if (isSuccess) setDetails(SessionDetails(data));
  }, [isSuccess]);

  const renderSlider = () => {
    SwiperCore.use([Navigation]);
    if (data) {
      const params = {
        className: "swiper-responsive-breakpoints swiper-container px-4 py-2",
        slidesPerView: 1,
        // spaceBetween: 5,
        navigation: true,
      };
      return (
        <Swiper {...params} className="p-0">
          {data?.sessionFileDtos?.map((item, index) => (
            <SwiperSlide key={index}>
              <Badge
                color={"danger"}
                style={{ position: "absolute", bottom: "0", cursor: "pointer" }}
                onClick={() => mutate(item.id)}
              >
                حذف فایل
              </Badge>
              <img
                style={{ height: "200px", width: "100%" }}
                alt="no-image"
                src={item.fileAddress}
                className="img-fluid rounded"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      );
    }
  };

  return (
    <Fragment>
      <div className="vertically-centered-modal ">
        <Modal
          className="modal-dialog-centered modal-lg"
          isOpen={isOpen}
          toggle={toggle}
        >
          <ModalHeader toggle={toggle}>جزئیات جلسه</ModalHeader>
          <ModalBody>
            {data && (
              <Row>
                <Col className="card text-wrap py-1" sm="7">
                  {details &&
                    details?.map((item, index) => (
                      <p key={index}>
                        {item.label}:
                        <span className="ms-1 text-wrap">{item.value}</span>
                      </p>
                    ))}
                  <p>
                    تاریخ شروع:{" "}
                    <span className="ms-1">
                      {ChangeMoment(data?.insertDate, "YYYY/MM/DD", "persian")}
                    </span>{" "}
                  </p>
                  <div style={{ width: "150px" }}>
                    <span>وضعیت : </span>
                    <Badge color={data?.forming ? "success" : "danger"}>
                      {data?.forming ? "تشکیل شده" : "تشکیل نشده"}
                    </Badge>
                  </div>
                </Col>
                <Col sm="5">
                  <div
                    className="text-center shadow"
                    style={{ height: "200px" }}
                  >
                    {data?.sessionFileDtos?.length != 0 ? (
                      renderSlider()
                    ) : (
                      <h4 className="my-6" style={{ paddingTop: "90px" }}>
                        فایلی هنوز وجود ندارد!
                      </h4>
                    )}
                  </div>
                  <SessionButtons
                    data={isSuccess && data}
                    toggleHW={toggleHWModal}
                    toggleEdit={toggleUpdateSessionModal}
                    toggleAddFileModal={toggleAddFileModal}
                    setId={setSessId}
                  />
                </Col>
              </Row>
            )}
            {!data && (
              <>
                <span className="w-100 text-center my-5 d-block">
                  جلسه ای وجود ندارد
                </span>
                <Col xs={12} className="text-center mt-2 pt-50 mt-5">
                  <Button
                    className="me-1"
                    color="primary"
                    onClick={toggleAddSessionModal}
                  >
                    ساخت جلسه
                  </Button>
                  <Button color="secondary" outline onClick={toggle}>
                    بستن
                  </Button>
                </Col>
              </>
            )}
          </ModalBody>
        </Modal>
      </div>
      <HomeWorkModal isOpen={HWModal} toggle={toggleHWModal} id={sessId} />
      <AddUpdateSessionModal
        isOpen={addSessionModal}
        toggle={toggleAddSessionModal}
        refetch={refetch}
        data={{ scheduleSessionId: id, sessionTitle: "", sessionDescribe: "" }}
        section={"create"}
      />
      <AddUpdateSessionModal
        isOpen={updateSessionModal}
        toggle={toggleUpdateSessionModal}
        refetch={refetch}
        data={isSuccess && data}
        section={"update"}
      />
      <AddSessionFileModal
        sessionData={isSuccess && data}
        refetch={refetch}
        isOpen={addFileModal}
        toggle={toggleAddFileModal}
      />
    </Fragment>
  );
};

export default SessionModal;
