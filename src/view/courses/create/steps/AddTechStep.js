// ** React Imports
import { Fragment, useState } from "react";

// ** select Imports
import SelectOptions from "../../../../@core/components/select/SelectOptions";
import { AddTechnologies } from "../../../../@core/services/api/post-api";

const AddTechnologiesStep = ({ courseTechnologies,courseId }) => {
  const [selectedTech, setSelectedTech] = useState([]);

  const AddTech = async () => {
    try {
      const addTech = await AddTechnologies(courseId, selectedTech);
      // console.log("create", addTech);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Fragment>
      <div className="w-75 mx-auto mb-3 mt-2" style={{ height: "300px" }}>
        <div className="d-flex flex-column gap-1 shadow p-3 mb-5 rounded">
          <SelectOptions
            tech={courseTechnologies && courseTechnologies}
            setSelectedTech={setSelectedTech}
            useTech={AddTech}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default AddTechnologiesStep
