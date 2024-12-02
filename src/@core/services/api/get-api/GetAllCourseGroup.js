import http from "../../interceptor";

const GetAllGroup = async (params) => {
  try {
    const response = await http.get("/CourseGroup", {
      params: params,
    });
    return response;
  } catch (error) {
    return [];
  }
};

export default GetAllGroup;