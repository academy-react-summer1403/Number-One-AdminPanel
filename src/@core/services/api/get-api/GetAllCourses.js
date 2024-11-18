import http from "../../interceptor";

const GetCourses = async (apiParams) => {
  try {
    const result = await http.get(`/Course/CourseList`, { params: apiParams });
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default GetCourses;
