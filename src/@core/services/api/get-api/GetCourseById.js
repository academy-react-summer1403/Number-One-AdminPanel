import http from "../../interceptor";

const GetCourseById = async (id) => {

  try {
    const result = await http.get(`/Course/${id}`);
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default GetCourseById;
