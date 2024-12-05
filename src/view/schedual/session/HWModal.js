import {
  Button,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";
import { HWHeaderTable } from "../../../@core/constants/session/HeaderTable";
import { Fragment, useState } from "react";
import { useQueryWithDependencies } from "../../../utility/hooks/useCustomQuery";
import { GetHomeWork } from "../../../@core/services/api/get-api";
import AddHWModal from "./AddHWModal";
import HWTableItems from "./HWTableItems";

const HomeWorkModal = ({ toggle, isOpen, id }) => {
  const { data, refetch } = useQueryWithDependencies(
    "GET_HOME_WORK",
    GetHomeWork,
    id,
    id,
    id != undefined
  );

  // Home Works Modal
  const [addModal, setAddModal] = useState(false);
  const toggleAddModal = () => setAddModal(!addModal);

  return (
    <Fragment>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader className="bg-transparent" toggle={toggle}></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">تکالیف</h1>
          </div>
          <Row>
            <Col xs={12}>
              <Table hover>
                <thead className="text-center">
                  <tr>
                    {HWHeaderTable.map((item, index) => (
                      <th key={index} className="px-0">
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data?.length > 0 &&
                    data?.map((item, index) => (
                      <HWTableItems item={item} key={index} />
                    ))}
                </tbody>
              </Table>
              {data?.length == 0 && (
                <span className="w-100 text-center my-5 d-block">
                  تکلیفی وجود ندارد
                </span>
              )}
            </Col>
            <Col xs={12} className="text-center mt-2 pt-50">
              <Button className="me-1" color="primary" onClick={toggleAddModal}>
                افزودن
              </Button>
              <Button color="secondary" outline onClick={toggle}>
                بستن
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
      <AddHWModal
        refetch={refetch}
        sessionId={id}
        isOpen={addModal}
        toggle={toggleAddModal}
      />
    </Fragment>
  );
};

export default HomeWorkModal;
