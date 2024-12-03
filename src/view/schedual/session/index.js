import {
  Button,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";
import { headerTable } from "../../../@core/constants/session/HeaderTable";
import { useQueryWithDependencies } from "../../../utility/hooks/useCustomQuery";
import { GetSessionDetail } from "../../../@core/services/api/get-api";
import { Fragment, useState } from "react";
import SessionTableItems from "./SessionTableItems";
import HomeWorkModal from "./HWModal";
import AddUpdateSessionModal from "./AddUpdateSession";
import toast from "react-hot-toast";

const SessionModal = ({ id, isOpen, toggle }) => {
  const [sessId, setSessId] = useState();
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

  // Update Session Modal
  const [updateSessionModal, setUpdateSessionModal] = useState(false);
  const toggleUpdateSessionModal = () =>
    setUpdateSessionModal(!updateSessionModal);

  const handleShowAddModal = () => {
    if (!data) {
      toggleAddSessionModal();
    } else {
      toast.error("جلسه از قبل وجود دارد");
    }
  };

  return (
    <Fragment>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        className="modal-dialog-centered modal-xl"
      >
        <ModalHeader className="bg-transparent" toggle={toggle}></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">جلسه</h1>
          </div>
          <Row>
            <Col xs={12}>
              <Table hover>
                <thead className="text-center">
                  <tr>
                    {headerTable.map((item, index) => (
                      <th key={index} className="px-0">
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data && (
                    <SessionTableItems
                      refetch={refetch}
                      item={isSuccess && data}
                      toggleHW={toggleHWModal}
                      toggleEdit={toggleUpdateSessionModal}
                      setId={setSessId}
                    />
                  )}
                </tbody>
              </Table>
              {!data && (
                <span className="w-100 text-center my-5 d-block">
                  جلسه ای وجود ندارد
                </span>
              )}
            </Col>
            <Col xs={12} className="text-center mt-2 pt-50 mt-5">
              <Button
                className="me-1"
                color="primary"
                onClick={handleShowAddModal}
              >
                ساخت جلسه
              </Button>
              <Button color="secondary" outline onClick={toggle}>
                بستن
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
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
    </Fragment>
  );
};

export default SessionModal;
