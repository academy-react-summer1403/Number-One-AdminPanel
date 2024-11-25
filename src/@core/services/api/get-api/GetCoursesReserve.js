import http from "../../interceptor";

const GetReservedCourses = async () => {
  try {
    const result = await http.get("/CourseReserve");
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default GetReservedCourses;
