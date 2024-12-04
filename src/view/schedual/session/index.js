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
import { useQueryWithDependencies } from "../../../utility/hooks/useCustomQuery";
import { GetSessionDetail } from "../../../@core/services/api/get-api";
import { Fragment, useEffect, useState } from "react";
import HomeWorkModal from "./HWModal";
import AddUpdateSessionModal from "./AddUpdateSession";
import ChangeMoment from "../../../utility/moment";
import SessionButtons from "./SessionButtons";
import AddSessionFileModal from "./AddSessionFileModal";

const SessionModal = ({ id, isOpen, toggle }) => {
  const [sessId, setSessId] = useState();
  const [details, setDetails] = useState(undefined);
  const { data, isSuccess, refetch } = useQueryWithDependencies(
    "GET_SESSION",
    GetSessionDetail,
    id,
    id
  );

  // Home Works Modal
  const [HWModal, setHWModal] = useState(false);
  const toggleHWModal = () => setHWModal(!HWModal);

  // Add Session Modal
  const [addSessionModal, setAddSessionModal] = useState(false);
  const toggleAddSessionModal = () => setAddSessionModal(!addSessionModal);

  // Add Session file Modal
  const [addFileModal, setAddFileModal] = useState(false);
  const toggleAddFileModal = () => setAddFileModal(!addFileModal);
  console.log(addFileModal)

  // Update Session Modal
  const [updateSessionModal, setUpdateSessionModal] = useState(false);
  const toggleUpdateSessionModal = () =>
    setUpdateSessionModal(!updateSessionModal);
  useEffect(() => {
    if (isSuccess) setDetails(SessionDetails(data));
  }, [isSuccess]);

  return (
    <Fragment>
      <div className="vertically-centered-modal ">
        <Modal
          className="modal-dialog-centered modal-lg"
          isOpen={isOpen}
          toggle={toggle}
        >
          <ModalHeader toggle={toggle}>جلسه</ModalHeader>
          <ModalBody>
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
                  {" "}
                  تاریخ شروع:{" "}
                  <span className="ms-1">
                    {" "}
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
                  className="text-center py-auto shadow"
                  style={{ height: "200px", paddingTop: "90px" }}
                >
                  {data?.sessionFileDtos.length == 0 ? (
                    <h4 className="my-6">فایلی هنوز وجود ندارد!</h4>
                  ) : (
                    <img src={data?.sessionFileDtos[0]} />
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
            {!data && (
              <>
                <span className="w-100 text-center my-5 d-block">
                  جلسه ای وجود ندارد
                </span>
                <Col xs={12} className="text-center mt-2 pt-50 mt-5">
                  <Button
                    className="me-1"
                    color="primary"
                    onClick={() => toggleAddSessionModal}
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
       <AddSessionFileModal isOpen={addFileModal} toggle={toggleAddFileModal}/>
    </Fragment>
  );
};

export default SessionModal;
