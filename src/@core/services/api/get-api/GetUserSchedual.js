import http from "../../interceptor";

const GetUserSchedual = async (params) => {
  try {
    const response = await http.get("/Schedual/GetStudentScheduals", {
      params: params,
    });
    return response;
  } catch (error) {
    return [];
  }
};

export default GetUserSchedual
