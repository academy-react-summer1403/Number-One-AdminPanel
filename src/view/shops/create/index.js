// ** React Imports
import { useRef, useState } from "react";

// ** Custom Components
import Wizard from "@components/wizard";

// ** Steps
// import { ProductInfo, ProductPreview } from "./steps";
import {
    ItemDescribeStep,
  ItemImageStep,
} from "../../../@core/components/create-item-steps";

// ** Icons Imports
import { FileText, Image, Info, Check } from "react-feather";
import { handleDescribe, handleImage } from "../store/CreateShop";
import { ProductInfo } from "../../products/create/steps";
import { AddShop } from "./steps";
import ShopPreview from "./steps/ShopPreview";

// Store

const CreateShopPage = () => {
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);

  const steps = [
    {
      id: "image",
      title: "عکس",
      subtitle: "عکس فروشگاه",
      icon: <Image size={18} />,
      content: (
        <ItemImageStep
          section={"فروشگاه"}
          handleFunc={handleImage}
          stepper={stepper}
          variant={"shop"}
        />
      ),
    },
    {
      id: "information",
      title: "اطلاعات",
      subtitle: "اطلاعات فروشگاه",
      icon: <FileText size={18} />,
      content: <AddShop stepper={stepper} />,
    },
    {
      id: "describe",
      title: "توضیحات",
      subtitle: "توضیحات فروشگاه",
      icon: <Info size={18} />,
      content: (
        <ItemDescribeStep
          section={"فروشگاه"}
          handleFunc={handleDescribe}
          stepper={stepper}
        />
      ),
    },
    {
      id: "preview",
      title: "پیش نمایش",
      subtitle: "پیش نمایش فروشگاه",
      icon: <Check size={18} />,
      content: <ShopPreview stepper={stepper} />,
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

export default CreateShopPage;
