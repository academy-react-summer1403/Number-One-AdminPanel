// ** Reactstrap Imports
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { ErrorMessage, Field, Form, Formik } from "formik";
import ReplayValidate from "../../@core/validations/ReplayComment.Validation";

const AddReplyCommentModal = ({
  setRepShow,
  repShow,
  addReplyComment,
  ids,
  refetch,
}) => {
  return (
    <>
      <div className="vertically-">
        <Modal
          isOpen={repShow}
          toggle={() => setRepShow(!repShow)}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={() => setRepShow(!repShow)}>
            <div className="mt-1">لطفا پاسخ کامنت را وارد نمایید</div>
          </ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                Title: "",
                Describe: "",
              }}
              validationSchema={ReplayValidate}
              onSubmit={(value) => addReplyComment(value, ids, refetch)}
            >
              <Form className="d-flex flex-column gap-1 shadow px-3 py-2 mb-5 rounded">
                <div className="form-group">
                  <label htmlFor="Title" className="form-label">
                    عنوان کامنت
                  </label>
                  <Field
                    id="Title"
                    name="Title"
                    placeholder="عنوان کامنت"
                    className="form-control relative border-b w-[100%] h-25 pr-12 shadow-md focus:outline-none focus:ring focus:ring-textCol3"
                  />
                  <ErrorMessage
                    name="Title"
                    component="div"
                    className="bg-black"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="Describe" className="form-label">
                    توضیحات کامنت
                  </label>
                  <Field
                    id="Describe"
                    name="Describe"
                    placeholder="توضیحات کامنت"
                    className="form-control relative border-b w-[100%] h-25 pr-12 shadow-md focus:outline-none focus:ring focus:ring-textCol3"
                  />
                </div>
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => {
                    setRepShow(!repShow);
                  }}
                  type="submit"
                >
                  ثبت کامنت
                </button>
              </Form>
            </Formik>
          </ModalBody>
        </Modal>
      </div>
    </>
  );
};

export default AddReplyCommentModal;
