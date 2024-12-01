import http from "../../interceptor";

const GetCourseAssistanceDetails = async (id) => {
  try {
    const response = await http.get(`/CourseAssistance/${id}`);
    console.log(response)
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default GetCourseAssistanceDetails;
