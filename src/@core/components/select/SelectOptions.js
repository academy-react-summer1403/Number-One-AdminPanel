// ** Utils
import { selectThemeColors } from "@utils";

// ** Third Party Components
import Select from "react-select";
import React, { useState } from "react";
import { Button } from "reactstrap";

const colorOptions = [
  { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
  { value: "blue", label: "Blue", color: "#0052CC", isFixed: true },
  { value: "purple", label: "Purple", color: "#5243AA", isFixed: true },
  { value: "red", label: "Red", color: "#FF5630", isFixed: false },
  { value: "orange", label: "Orange", color: "#FF8B00", isFixed: false },
  { value: "yellow", label: "Yellow", color: "#FFC400", isFixed: false },
];

const SelectOptions = ({ tech, setSelectedTech, useTech }) => {
  const newTech = tech?.map((t) => ({ value: t.id, label: t.techName }));

  const handleSelectChange = (e) => {
    const chosenTech = e.map((tech) => ({ techId: tech.value }));
    setSelectedTech(chosenTech);
    console.log(chosenTech);
  };

  const handleButtonClick = () => {
    useTech();
  };

  return (
    <div className="">
      <Select
        className="border-b"
        onChange={handleSelectChange}
        // isClearable={false}
        theme={selectThemeColors}
        isMulti
        name="colors"
        options={newTech}
        classNamePrefix="select"
        placeholder="تکنولوژی را انتخاب کنید..."
      />
      <Button
        onClick={handleButtonClick}
        style={{ width: "100%"}}
        className="mt-3 mx-auto"
        color="primary"
      >
         ثبت نهایی{" "}
      </Button>
    </div>
  );
};

export default SelectOptions;
