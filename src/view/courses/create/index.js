// ** React Imports
import { useEffect, useRef, useState } from "react";

// ** Custom Components
import Wizard from "../../../@core/components/wizard";

// ** Steps
// import { Address } from "./steps/Address";
// import PersonalInfo2 from "./steps/PersonalInfo2";
// import EditorDescribe from "./steps/EditorDescribe";
// import PictureCourse from "./steps/PictureCourse";
import AddCourseStep1 from "./steps/AddCourseStep1";
import { useQueryWithDependencies } from "../../../utility/hooks/useCustomQuery";
import { GetCreateCourse, GetTechnologies } from "../../../@core/services/api/get-api";
import { CreateCourse } from "../../../@core/services/api/post-api";
import AddCourseStep2 from "./steps/AddCourseStep2";

const AddCourseSteps = () => {
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);

  const [firstLevel, setFirstLevel] = useState([]);
  const [secondLevel, setSecondLevel] = useState([]);
  const [thirdLevel, setThirdLevel] = useState([]);
  const [descEditor, setDescEditor] = useState(undefined);
  const [courseId, setCourseId] = useState("");

  // API  Getting data from Api with use Query
  const { data: courseOptions } = useQueryWithDependencies(
    "GET_COURSE_OPTIONS",
    GetCreateCourse,
    null,
    null
  );
  const { data: courseTechnologies } = useQueryWithDependencies(
    "GET_COURSE_TECHNOLOGIES",
    GetTechnologies,
    null,
    null
  );

  // API  Adding data to Api
  const addCourse = async () => {
    if (firstLevel && secondLevel && thirdLevel && descEditor) {

      try {
        const Form = {
          ...firstLevel,
          ...secondLevel,
          ...thirdLevel,
          ...descEditor,
        };
        console.log("finalForm", Form);
        const AddCourse = await CreateCourse(Form);
        console.log("newCourse", AddCourse);
        setCourseId(AddCourse.id);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // **useEffect
  useEffect(() => {
    if (descEditor) {
      addCourse();
    }
  }, [descEditor]);

  const steps = [
    {
      id: "account-details",
      title: "مشخصات دوره مرحله اول",
      subtitle: "لطفا فیلد های این مرحله را پر کنید",
      content: (
        <AddCourseStep1
          stepper={stepper}
          type="wizard-vertical"
          setFirstLv={setFirstLevel}
        />
      ),
    },
    {
      id: "personal-info",
      title: "مشخصات دوره مرحله دوم",
      subtitle: "لطفا فیلد های این مرحله را پر کنید",
      content: (
        <AddCourseStep2
          stepper={stepper}
          type="wizard-vertical"
          courseOptions={courseOptions && courseOptions}
          setSecondLv={setSecondLevel}
        />
      ),
    },
    // {
    //   id: "personal-info2",
    //   title: "مشخصات دوره مرحله سوم",
    //   subtitle: "لطفا فیلد های این مرحله را پر کنید",
    //   content: (
    //     <PersonalInfo2
    //       stepper={stepper}
    //       addCourse={addCourse}
    //       type="wizard-vertical"
    //       setThirdLv={setThirdLevel}
    //     />
    //   ),
    // },
    // {
    //   id: "personal-info3",
    //   title: "متن دوره",
    //   subtitle: "لطفا متن دوره را وارد کنید",
    //   content: (
    //     <EditorDescribe
    //       stepper={stepper}
    //       type="wizard-vertical"
    //       setDesc={setDescEditor}
    //     />
    //   ),
    // },
    // {
    //   id: "step-address",
    //   title: "افزودن تکنولوژی",
    //   subtitle: "لطفا تکنولوژی های مربوط به دوره را انتخاب کنید",
    //   content: (
    //     <Address
    //       courseTechnologies={courseTechnologies}
    //       courseId={courseId}
    //       type="wizard-vertical"
    //     />
    //   ),
    // },
    // {
    //   id: "step-image",
    //   title: "افزودن تصویر",
    //   subtitle: "لطفا برای دوره عکس انتخاب کنید",
    //   content: (
    //     <PictureCourse
    //       // courseTechnologies={courseTechnologies}
    //       // courseId={courseId}
    //       type="wizard-vertical"
    //     />
    //   ),
    // },
  ];

  return (
    <div style={{ height: "auto" }} className="modern-vertical-wizard">
      <Wizard
        type="modern-vertical"
        ref={ref}
        // className="border"
        // style={{height:"1000px"}}
        steps={steps}
        options={{
          linear: false,
        }}
        instance={(el) => setStepper(el)}
      />
    </div>
  );
};

export default AddCourseSteps;
