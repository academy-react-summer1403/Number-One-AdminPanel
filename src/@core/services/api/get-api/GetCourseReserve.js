import http from "../../interceptor";

const GetCourseReserve = async (id) => {
    try {
      const result = await http.get(`/CourseReserve/${id}`);
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  export default GetCourseReserve