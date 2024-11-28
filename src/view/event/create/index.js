// ** React Imports
import { useRef, useState } from "react";

// ** Custom Components
import Wizard from "@components/wizard";

// ** Steps
import { EventInfo, EventPreview } from "./steps";
import {
  ItemDescribeStep,
  ItemImageStep,
} from "../../../@core/components/create-item-steps";

// ** Icons Imports
import { FileText, Image, Info, Check } from "react-feather";

// Store
import { handleDescribe, handleImage } from "../store/CreateEvent";
import { useSelector } from "react-redux";

const CreateEventWrapper = () => {
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);

  const preview = useSelector(
    (state) => state.CreateEvent.previewImage
  );

  const steps = [
    {
      id: "image",
      title: "عکس",
      subtitle: "عکس ایونت",
      icon: <Image size={18} />,
      content: (
        <ItemImageStep
          section={"ایونت"}
          handleFunc={handleImage}
          stepper={stepper}
          preview={preview}
        />
      ),
    },
    {
      id: "information",
      title: "اطلاعات",
      subtitle: "اطلاعات ایونت",
      icon: <FileText size={18} />,
      content: <EventInfo stepper={stepper} />,
    },
    {
      id: "describe",
      title: "توضیحات",
      subtitle: "توضیحات ایونت",
      icon: <Info size={18} />,
      content: (
        <ItemDescribeStep
          section={"ایونت"}
          handleFunc={handleDescribe}
          stepper={stepper}
        />
      ),
    },
    {
      id: "preview",
      title: "پیش نمایش",
      subtitle: "پیش نمایش ایونت",
      icon: <Check size={18} />,
      content: <EventPreview stepper={stepper} />,
    },
  ];

  return (
    <div className="modern-vertical-wizard">
      <Wizard
        type="modern-vertical"
        ref={ref}
        steps={steps}
        options={{
          linear: false,
        }}
        instance={(el) => setStepper(el)}
      />
    </div>
  );
};

export default CreateEventWrapper;
