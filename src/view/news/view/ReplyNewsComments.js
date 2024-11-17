// ** Reactstrap Imports
import { Modal, ModalHeader, ModalBody } from "reactstrap";

// Formik
import { Field, Form, Formik } from "formik";

const ReplyNewsComments = ({ setRepShow, repShow, addReplyComment }) => {
  return (
    <div className="vertically-centered-modal">
      <Modal isOpen={repShow} toggle={() => setRepShow(!repShow)}>
        <ModalHeader toggle={() => setRepShow(!repShow)}>
          <div className="mt-1">لطفا پاسخ کامنت را وارد نمایید</div>
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              Title: "",
              Describe: "",
            }}
            onSubmit={(value) => addReplyComment(value)}
          >
            <Form className="d-flex flex-column gap-1 shadow px-3 py-2 mb-5 bg-body rounded">
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
                className="btn btn-success mt-2"
                onClick={() => {
                  setRepShow(!repShow);
                }}
                type="submit"
              >
                ثبت
              </button>
            </Form>
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ReplyNewsComments;
