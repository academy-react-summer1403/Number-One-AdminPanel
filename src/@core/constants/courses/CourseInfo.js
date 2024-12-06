import { SeparationPrice } from "../../../utility/separation-price";

const CoursesInfo = (data) => {
  const tech = data?.courseTeches?.map((item) => item);
  
  console.log(tech)
  const detailCourse = [
    { label: "دسته بندی", value: tech },
    { label: "وضعیت دوره", value: data?.courseStatusName },
    { label: "سطح دوره", value: data?.courseLevelName },
    { label: "نحوه برگزاری", value: data?.courseTypeName },
    { label: "مکان برگزاری", value: data?.courseClassRoomName },
    { label: "مدرس دوره", value: data?.teacherName },
    { label: "تاریخ شروع", value: data?.startTime?.slice(0, 10) },
    { label: "تاریخ پایان", value: data?.endTime?.slice(0, 10) },
    { label: "قیمت دوره", value: SeparationPrice(data?.cost) + " ریال" },
  ];
  return detailCourse;
};

export default CoursesInfo;
