const EditCourseField = (detail) => {
  console.log(detail)
  const fields = {
    Id: detail.courseId ?? "",
    Title: detail.title ?? "",
    Describe: detail.describe ?? "",
    MiniDescribe: detail.describe ?? "",
    Capacity: [50],
    CourseTypeId: [2],
    SessionNumber: [30],
    TremId: [1],
    ClassId: [1],
    CourseLvlId: [1],
    TeacherId: detail.teacherId ?? "",
    Cost: detail.cost ?? "",
    UniqeUrlString: "" ,
    // detail?.courseId?.slice(1,8)
    StartTime: detail.startTime,
    EndTime: detail.endTime,
    Image:detail.imageAddress ?? ""
  };

  return fields;
};

export default EditCourseField;
