import http from "../../interceptor";

const GetCourseComment = async (id) => {
  try {
    const result = await http.get(`/Course/GetCourseCommnets/${id}`);
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default GetCourseComment;
