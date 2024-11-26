// ** React Imports
import { Fragment, useState } from "react";

// ** Reactstrap Imports
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from "reactstrap";
// import OptionComponent from "../../select/SelectOptions";
import { Field, Form, Formik, useFormik } from "formik";

const ModalBasic = ({
  centeredModal,
  setCenteredModal,
  groupData,
  changeReserve,
  toggleTab,
}) => {
  // console.log("grr", courseGr);
  return (
    <>
      <div className="vertically-centered-modal">
        <Modal
          className="modal-dialog-centered "
          isOpen={centeredModal}
          toggle={() => setCenteredModal(!centeredModal)}
        >
          {groupData?.length > 0 ? (
            <>
              <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>
                {" "}
                لطفا گروه را انتخاب نمایید{" "}
              </ModalHeader>
              <ModalBody>
                <Formik
                  initialValues={{
                    CourseId: [],
                  }}
                  onSubmit={(value) => changeReserve(value.CourseId)}
                >
                  <Form className="d-flex flex-column gap-1 shadow p-3 mb-5 bg-body rounded">
                    <Field
                      as="select"
                      name="CourseId"
                      placeholder=" نام گروه "
                      className="relative border-b w-[100%] h-25 pr-12 shadow-md focus:outline-none focus:ring focus:ring-textCol3"
                    >
                      <option>انتخاب گروه </option>
                      {groupData?.map((item, index) => {
                        console.log("vv", item.groupId);
                        return (
                          <option key={index} value={item.groupId}>
                            {item.groupName}
                          </option>
                        );
                      })}
                    </Field>
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        setCenteredModal(!centeredModal);
                      }}
                      type="onsubmit"
                    >
                      ثبت
                    </button>
                  </Form>
                </Formik>
                {/* <OptionComponent/> */}
              </ModalBody>
            </>
          ) : (
            <>
              <ModalHeader
                toggle={() => setCenteredModal(!centeredModal)}
              ></ModalHeader>
              <ModalBody>
                <div className="text-center d-flex flex-column">
                  <h4 className="text-center pb-2">
                    برای این دوره هیج گروهی ثبت نشده است{" "}
                  </h4>
                  <span className="text-center">
                    {" "}
                    برای تایید کاربر باید کاربر را به گروهی اضافه کنید
                  </span>
                  <span className="text-center">
                    {" "}
                    لطفاابتدا برای این دوره گروه بسازید
                  </span>
                  <span className="mt-2">
                    <Button
                      className=" px-2 py-1 text-right"
                      // style={{ width: "15%", direction: "ltr" }}
                      color="primary"
                      onClick={() => {
                        setCenteredModal(!centeredModal), toggleTab("4");
                      }}
                    >
                      افزودن گروه
                    </Button>
                  </span>
                </div>
              </ModalBody>
            </>
          )}
        </Modal>
      </div>
    </>
  );
};
export default ModalBasic;
