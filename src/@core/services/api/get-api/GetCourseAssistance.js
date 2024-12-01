import http from "../../interceptor";

const GetCourseAssistance = async () => {
  try {
    const response = await http.get("/CourseAssistance");
    return response;
  } catch (error) {
    return [];
  }
};

export default GetCourseAssistance;
