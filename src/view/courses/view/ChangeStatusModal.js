// ** React Imports
import { Fragment, useState } from "react";

// ** Reactstrap Imports
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import { GetCourseStatus } from "../../../@core/services/api/get-api";
import { ChangeCourseStatus } from "../../../@core/services/api/put-api";
import { useQueryWithDependencies } from "../../../utility/hooks/useCustomQuery";
import Select from "react-select";

//

const ChangeStatusModal = ({ changeStatusModal, id, toggle, refetch }) => {
  const [statusId, setStatusId] = useState(undefined);

  const handleSelectChange = (statusId) => {
    console.log(statusId);
    setStatusId(statusId.value);
  };

  // API  Getting data from Api with use Query
  const { data: courseStatus } = useQueryWithDependencies(
    "GET_COURSE_STATUS",
    GetCourseStatus,
    null,
    null
  );

  const ChangeStatus = async () => {
    try {
      if (statusId) {
        const result = await ChangeCourseStatus(id, statusId);
        console.log(result);
        if (result.success) {
          toggle();
          refetch();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const newStatus = courseStatus?.map((t) => ({ value: t.id, label: t.statusName }));

  return (
    <>
      <div className="vertically-centered-modal">
        <Modal
          className="modal-dialog-centered modal-lg"
          isOpen={changeStatusModal}
          toggle={() => toggle()}
        >
          <ModalHeader toggle={() => toggle()}>
            {" "}
            لطفا وضعیت دوره را انتخاب نمایید{" "}
          </ModalHeader>
          <ModalBody>
            {/* <div className="w-75 mx-auto" style={{ height: "300px" }}> */}
            {console.log(newStatus) }
            <div className="d-flex flex-column gap-1 shadow p-3 mb-5 rounded">
              <Select
                className="react-select rounded-3"
                classNamePrefix="select"
                defaultValue={newStatus &&  newStatus[0]}
                // name="rowsFunc"
                options={newStatus && newStatus}
                onChange={handleSelectChange}
              />
              <Button
                onClick={() => ChangeStatus()}
                style={{ width: "100%" }}
                className="mt-3 mx-auto"
                color="primary"
              >
                ثبت نهایی{" "}
              </Button>
            </div>
            {/* </div> */}
          </ModalBody>
        </Modal>
      </div>
    </>
  );
};

export default ChangeStatusModal;
