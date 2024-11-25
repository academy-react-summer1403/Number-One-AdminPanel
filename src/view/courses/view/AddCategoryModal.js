// ** React Imports
import { Fragment, useState } from "react";

// ** Reactstrap Imports
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import SelectOptions from "../../../@core/components/select/SelectOptions";
import AddTechnologies from "../../../@core/services/api/post-api/AddTechnologies";
import { useQueryWithDependencies } from "../../../utility/hooks/useCustomQuery";
import { GetTechnologies } from "../../../@core/services/api/get-api";

const AddCategoryModal = ({
  addTechModal,
  setAddTechModal,
  id,
  toggle,
  refetch,
}) => {
  const [selectedTech, setSelectedTech] = useState([]);

  // API  Getting data from Api with use Query
  const { data: courseTechnologies } = useQueryWithDependencies(
    "GET_COURSE_TECHNOLOGIES",
    GetTechnologies,
    null,
    null
  );

  const AddTech = async () => {
    try {
      const addTech = await AddTechnologies(id, selectedTech);
      // console.log("create", addTech);
      if (addTech.success) {
        toggle();
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="vertically-centered-modal">
        <Modal
          className="modal-dialog-centered modal-lg"
          isOpen={addTechModal}
          toggle={() => setAddTechModal(!addTechModal)}
        >
          <ModalHeader toggle={() => setAddTechModal(!addTechModal)}>
            {" "}
            لطفا دسته بندی دوره را انتخاب نمایید{" "}
          </ModalHeader>
          <ModalBody>
            {/* <div className="w-75 mx-auto" style={{ height: "300px" }}> */}
            <div className="d-flex flex-column gap-1 shadow p-3 mb-5 rounded">
              <SelectOptions
                tech={courseTechnologies && courseTechnologies}
                setSelectedTech={setSelectedTech}
                useTech={AddTech}
              />
            </div>
            {/* </div> */}
          </ModalBody>
        </Modal>
      </div>
    </>
  );
};
export default AddCategoryModal;
