// ** React Imports
import { useEffect, useState } from "react";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { Check, X } from "react-feather";
import { useMutation } from "@tanstack/react-query";
import { AddUserAccess } from "../../../@core/services/api/post-api";
import { useSelector } from "react-redux";

const CustomLabel = ({ htmlFor }) => {
  return (
    <Label className="form-check-label" htmlFor={htmlFor}>
      <span className="switch-icon-left">
        <Check size={14} />
      </span>
      <span className="switch-icon-right">
        <X size={14} />
      </span>
    </Label>
  );
};

const UserAddRole = ({ modal, id, toggleModal, refetch }) => {
  const userDetails = useSelector((state) => state.UserInfoSlice.details);
  const userRoles =
    userDetails && userDetails.roles?.map((item) => item.roleName);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [isStudent, setIsStudent] = useState(false);

  useEffect(() => {
    if (userRoles?.includes("Administrator")) setIsAdmin(true);
    else setIsAdmin(false);

    if (userRoles?.includes("Teacher")) setIsTeacher(true);
    else setIsTeacher(false);

    if (userRoles?.includes("Student")) setIsStudent(true);
    else setIsStudent(false);
  }, [userRoles, refetch]);

  // Change User Access
  const { mutate: changeAccess, isSuccess } = useMutation({
    mutationKey: ["CHANGE_ACCESS"],
    mutationFn: (isRoleChecked, roleId) => {
      AddUserAccess(isRoleChecked, roleId, id);
    },
  });

  const handleChangeAccess = async (
    isRoleChecked,
    roleId,
    setIsRoleChecked
  ) => {
    changeAccess(isRoleChecked, roleId);
    if (isSuccess) {
      setIsRoleChecked((prev) => !prev);
      refetch();
    }
  };

  const switchItems = [
    {
      role: isAdmin,
      id: "admin",
      label: "ادمین",
      action: () => {
        handleChangeAccess(isAdmin, 1, setIsAdmin);
      },
    },
    {
      role: isTeacher,
      id: "teacher",
      label: "استاد",
      action: () => {
        handleChangeAccess(isTeacher, 2, setIsTeacher);
      },
    },
    {
      role: isStudent,
      id: "student",
      label: "دانشجو",
      action: () => {
        handleChangeAccess(isStudent, 5, setIsStudent);
      },
    },
  ];

  return (
    <Modal
      isOpen={modal === id}
      toggle={() => toggleModal(id)}
      className="modal-dialog-centered modal-xs"
      key={id}
    >
      <ModalHeader toggle={() => toggleModal(id)}>
        در این بخش میتونید دسترسی های لازم را به {userDetails.fName} بدهید.
      </ModalHeader>
      <ModalBody>
        {switchItems.map((item, index) => (
          <Card key={index}>
            <CardHeader className="add-user-role-card-header">
              <Badge color={item.role ? "success" : "danger"}>
                {item.role ? "فعال" : "غیر فعال"}
              </Badge>

              <CardBody className="d-flex justify-content-center">
                <div className="d-flex align-items-center gap-1">
                  <Label
                    for={item.id}
                    className="form-check-label select-role-switch"
                  >
                    {item.label}
                  </Label>
                  <div className="form-switch form-check-success">
                    <Input
                      type="switch"
                      checked={item.role}
                      id={item.id}
                      name={item.id}
                      onChange={item.action}
                    />
                    <CustomLabel htmlFor={item.id} />
                  </div>
                </div>
              </CardBody>
            </CardHeader>
          </Card>
        ))}
      </ModalBody>
    </Modal>
  );
};

export default UserAddRole;
