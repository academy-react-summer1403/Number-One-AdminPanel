import http from "../../interceptor";

const GetCourseTeacher = async (params) => {
  try {
    const response = await http.get("/Course/TeacherCourseList", {
      params: params,
    });
    return response;
  } catch (error) {
    return [];
  }
};

export default GetCourseTeacher;
