// ** React Imports
import { useRef, useState } from "react";

// ** Custom Components
import Wizard from "@components/wizard";

// ** Steps
import { ProductInfo, ProductPreview } from "./steps";
import {
  ItemDescribeStep,
  ItemImageStep,
} from "../../../@core/components/create-item-steps";

// ** Icons Imports
import { FileText, Image, Info, Check } from "react-feather";

// Store
import { handleDescribe, handleImage } from "../store/CreateProducts";

const CreateProductPage = () => {
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);

  const steps = [
    {
      id: "image",
      title: "عکس",
      subtitle: "عکس محصول",
      icon: <Image size={18} />,
      content: (
        <ItemImageStep
          section={"محصول"}
          handleFunc={handleImage}
          stepper={stepper}
        />
      ),
    },
    {
      id: "information",
      title: "اطلاعات",
      subtitle: "اطلاعات محصول",
      icon: <FileText size={18} />,
      content: <ProductInfo stepper={stepper} />,
    },
    {
      id: "describe",
      title: "توضیحات",
      subtitle: "توضیحات محصول",
      icon: <Info size={18} />,
      content: (
        <ItemDescribeStep
          section={"محصول"}
          handleFunc={handleDescribe}
          stepper={stepper}
        />
      ),
    },
    {
      id: "preview",
      title: "پیش نمایش",
      subtitle: "پیش نمایش محصول",
      icon: <Check size={18} />,
      content: <ProductPreview stepper={stepper} />,
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

export default CreateProductPage;
