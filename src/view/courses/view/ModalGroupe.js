// ** Reactstrap Imports
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { Field, Form, Formik } from "formik";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useMutationWithRefetch } from "../../../utility/hooks/useCustomQuery";
import { AddCourseGroupe } from "../../../@core/services/api/post-api";
import { UpdateCourseGroup } from "../../../@core/services/api/put-api";
import { GetGroupDetails } from "../../../@core/services/api/get-api";

const ModalGroup = ({
  setShowModal,
  showModal,
  refetchGroup,
  groupId,
  variant,
}) => {
  const { id } = useParams();
  // Adding and Editing Group from Api with use Mutation
  const { mutate: addGroup } = useMutationWithRefetch(
    "ADD_COURSE_GROUPS",
    AddCourseGroupe,
    refetchGroup
  );
  const { mutate: editGroup } = useMutationWithRefetch(
    "EDIT_COURSE_GROUPS",
    UpdateCourseGroup,
    refetchGroup
  );

  // Getting Group Data from Api With use Query
  const { data: groupData } = useQuery({
    queryKey: ["GET_GROUP_DATA", groupId],
    queryFn: () => {
      return GetGroupDetails(groupId);
    },
    enabled: !!(groupId !== undefined),
  });

  const setGroup = variant === "add" ? addGroup : editGroup;
  const showModalStatus =
    variant === "edit" ? groupData !== undefined : variant;
  const textVariant = {
    add: ["ثبت", "افزودن گروه"],
    edit: ["ویرایش", "ویرایش اطلاعات گروه"],
  };

  return (
    <>
      <div className="vertically-centered-modal ">
        <Modal
        className="modal-dialog-centered "
          isOpen={showModalStatus && showModal}
          toggle={() => setShowModal(!showModal)}
        >
          <ModalHeader toggle={() => setShowModal(!showModal)}>
            {textVariant?.[variant] && textVariant?.[variant][1]}{" "}
          </ModalHeader>
          {/* <ModalBody> */}
            <Formik
              initialValues={{
                GroupName:
                  variant === "edit" ? groupData?.courseGroupDto?.groupName : "",
                GroupCapacity:
                  variant === "edit"
                    ? groupData?.courseGroupDto?.groupCapacity
                    : [],
              }}
              onSubmit={(value) => setGroup({ value, id, groupId })}
            >
              <Form className="d-flex flex-column gap-1 shadow p-3 mb-5 bg-body rounded">
                <Field
                  name="GroupName"
                  placeholder=" نام گروه "
                  className="relative border-b w-[100%] h-25 pr-12 shadow-md focus:outline-none focus:ring focus:ring-textCol3"
                />
                <Field
                  // type="number"
                  name="GroupCapacity"
                  placeholder=" ظرفیت گروه "
                  className="relative border-b w-[100%] h-25 pr-12 shadow-md focus:outline-none focus:ring focus:ring-textCol3"
                />
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setShowModal(!showModal);
                  }}
                  type="onsubmit"
                >
                  {textVariant?.[variant] && textVariant?.[variant][0]}
                </button>
              </Form>
            </Formik>
          {/* </ModalBody> */}
        </Modal>
      </div>
    </>
  );
};
export default ModalGroup;
