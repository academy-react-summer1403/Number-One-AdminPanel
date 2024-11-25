import http from "../../interceptor";

const GetCourseGroups = async (params) => {
  try {
    const result = await http.get(
      `CourseGroup/GetCourseGroup?TeacherId=${params.teacherId}&CourseId=${params.courseId}`
    );
    return result;
  } catch (error) {
    // console.log(error);
    return [];
  }
};

export default GetCourseGroups;
