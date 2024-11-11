import { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, Label } from "reactstrap";
import { Field, Form, Formik } from "formik";

// Constants
import { CreateUserModalFields } from "../../../@core/constants/user";

// Api
import { useMutation } from "@tanstack/react-query";
import { CreateUser } from "../../../@core/services/api/post-api";

const CreateNewUser = ({ open, toggleSidebar, setSidebarOpen }) => {
  const [roleCheckBox, setRoleCheckBox] = useState("isStudent");

  // Create New User
  const { mutate } = useMutation({
    mutationKey: ["CREATE_USER"],
    mutationFn: (event) => {
      CreateUser({
        firstName: event.firstName,
        lastName: event.lastName,
        gmail: event.gmail,
        phoneNumber: event.phoneNumber,
        password: event.password,
        isStudent: roleCheckBox == "isStudent" ? true : false,
        isTeacher: roleCheckBox == "isTeacher" ? true : false,
      });
    },
  });

  // Initial Values For Form
  const initialValues = {
    firstName: "",
    lastName: "",
    gmail: "",
    phoneNumber: "",
    password: "",
  };

  return (
    <div className="vertically-centered-modal">
      <Modal isOpen={open} toggle={() => setSidebarOpen(!open)}>
        <ModalHeader
          className="pt-2 fw-bolder"
          toggle={() => setSidebarOpen(!open)}
        >
          لطفا اطلاعات کاربر را وارد نمایید
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={initialValues}
            onSubmit={(event) => mutate(event)}
          >
            <Form>
              {CreateUserModalFields.map((item, index) => (
                <div key={index} className="mb-1">
                  <Label className="form-label" for="firstName">
                    {item.label}
                    <span className="text-danger">*</span>
                  </Label>
                  <Field
                    type={item.type}
                    name={item.name}
                    placeholder={item.placeholder}
                    className="form-control"
                  />
                </div>
              ))}
              <Label className="form-label" for="user-role">
                تعیین نقش کاربر
              </Label>
              <Field
                as="select"
                name="role"
                onChange={(e) => {
                  setRoleCheckBox(e.target.value);
                }}
                className="form-select mb-2"
              >
                <option value="isStudent">دانشجو</option>
                <option value="isTeacher">استاد</option>
              </Field>
              <Button type="submit" className="me-1" color="primary">
                ثبت
              </Button>
              <Button
                type="reset"
                color="secondary"
                outline
                onClick={toggleSidebar}
              >
                انصراف
              </Button>
            </Form>
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CreateNewUser;
