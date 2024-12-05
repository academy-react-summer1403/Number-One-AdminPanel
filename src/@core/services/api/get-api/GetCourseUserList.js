import http from "../../interceptor";

const GetCourseUserList = async (params) => {
  try {
    const response = await http.get("/CourseUser/GetCourseUserList", {
      params: params,
    });
    return response;
  } catch (error) {
    return [];
  }
};

export default GetCourseUserList;
