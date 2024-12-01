// ** Reactstrap Imports
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { Field, Form, Formik } from "formik";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useMutationWithRefetch } from "../../../utility/hooks/useCustomQuery";
import { AddSocialGroup } from "../../../@core/services/api/post-api";
import { UpdateSocialGroup } from "../../../@core/services/api/put-api";
import { GetSocialGroupDetails } from "../../../@core/services/api/get-api";

const SocialModal = ({
  setShowModal,
  showModal,
  refetchGroup,
  groupId,
  variant,
}) => {
  const { id } = useParams();
  // Adding and Editing Group from Api with use Mutation
  const { mutate: addGroup } = useMutationWithRefetch(
    "ADD_SOCIAL_GROUP",
    AddSocialGroup,
    refetchGroup
  );
  const { mutate: editGroup } = useMutationWithRefetch(
    "EDIT_SOCIAL_GROUP",
    UpdateSocialGroup,
    refetchGroup
  );

  // Getting Group Data from Api With use Query
  const { data: groupData } = useQuery({
    queryKey: ["GET_GROUP_DATA", groupId],
    queryFn: () => {
      return GetSocialGroupDetails(groupId);
    },
    enabled: !!(groupId !== undefined),
  });

  //   const setGroup = variant === "add" ? addGroup : editGroup;
  const showModalStatus =
    variant === "edit" ? groupData !== undefined : variant;
  const textVariant = {
    add: ["ثبت", "افزودن گروه اجتماعی"],
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
          <ModalBody>
          <Formik
            initialValues={{
              groupName: variant === "edit" ? groupData?.groupName : "",
              groupLink: variant === "edit" ? groupData?.groupLink : [],
            }}
            onSubmit={async (value) => {
              if (variant == "add") {
                addGroup(Object.assign(value, { courseId: id }));
              } else {
                editGroup(Object.assign(value, { courseId: id, id: groupId }));
              }
            }}
          >
            <Form className="d-flex flex-column gap-2  p-3 rounded">
              <Field
                name="groupName"
                placeholder=" نام گروه مجازی"
                className="relative border-b w-[100%] h-25 pr-12 shadow-md focus:outline-none focus:ring focus:ring-textCol3"
              />
              <Field
                // type="number"
                name="groupLink"
                placeholder="لینک گروه مجازی"
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
          </ModalBody>
        </Modal>
      </div>
    </>
  );
};
export default SocialModal;
