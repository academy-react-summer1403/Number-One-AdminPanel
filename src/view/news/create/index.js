// ** React Imports
import { useRef, useState } from "react";

// ** Custom Components
import Wizard from "@components/wizard";

// ** Steps
import { NewsInfo, NewsPreview } from "./steps";
import {
  ItemDescribeStep,
  ItemImageStep,
} from "../../../@core/components/create-item-steps";

// ** Icons Imports
import { FileText, Image, Info, Check } from "react-feather";

// Redux
import { handleDescribe, handleImage } from "../store/CreateNews";

const CreateNewsPage = () => {
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);

  const steps = [
    {
      id: "image",
      title: "عکس",
      subtitle: "عکس خبر",
      icon: <Image size={18} />,
      content: (
        <ItemImageStep
          section={"خبر"}
          handleFunc={handleImage}
          stepper={stepper}
        />
      ),
    },
    {
      id: "information",
      title: "اطلاعات",
      subtitle: "اطلاعات خبر",
      icon: <FileText size={18} />,
      content: <NewsInfo stepper={stepper} />,
    },
    {
      id: "describe",
      title: "توضیحات",
      subtitle: "توضیحات خبر",
      icon: <Info size={18} />,
      content: (
        <ItemDescribeStep
          handleFunc={handleDescribe}
          section={"خبر"}
          stepper={stepper}
        />
      ),
    },
    {
      id: "preview",
      title: "پیش نمایش",
      subtitle: "پیش نمایش خبر",
      icon: <Check size={18} />,
      content: <NewsPreview stepper={stepper} />,
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

export default CreateNewsPage;
