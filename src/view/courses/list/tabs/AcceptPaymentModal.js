// ** Reactstrap Imports
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import { AcceptCoursePayment } from "../../../../@core/services/api/put-api";
import { DeleteCoursePayment } from "../../../../@core/services/api/delete-api";

const AcceptPaymentModal = ({
  showModal,
  setShowModal,
  paymentId,
  paymentReceipt,
  refetch,
}) => {

  // Payment approval or disapproval function
  const handleAcceptPayment = (status) => {
    setShowModal(!showModal);
    if (status === "accept") AcceptCoursePayment(paymentId, refetch);
    else if (status === "delete") DeleteCoursePayment(paymentId, refetch);
  };

  return (
    <>
      <div className="vertically-centered-modal ">
        <Modal
          className="modal-dialog-centered modal-md"
          isOpen={showModal}
          toggle={() => setShowModal(!showModal)}
        >
          <ModalHeader toggle={() => setShowModal(!showModal)}>
            تعیین وضعیت پرداخت
          </ModalHeader>
          <ModalBody>
            <div className="shadow mt-1 mb-4 p-1">
              {paymentReceipt != null ? (
                <img
                  src={paymentReceipt}
                  style={{ width: "100%", height: "300px" }}
                />
              ) : (
                <h2 className="text-center">
                  {" "}
                  رسید پرداخت توسط پرداخت کننده بارگزاری نشده!
                </h2>
              )}
            </div>
            <div className="d-flex gap-3 mb-1 justify-content-center">
              <Button
                color="primary"
                className={`${paymentReceipt == null ? "hidden" : ""}`}
                onClick={() => handleAcceptPayment("accept")}
              >
                تایید پرداخت
              </Button>
              <Button
                color="danger"
                outline
                onClick={() => handleAcceptPayment("delete")}
              >
                حذف پرداخت
              </Button>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </>
  );
};
export default AcceptPaymentModal;
