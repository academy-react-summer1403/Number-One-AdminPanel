import http from "../../interceptor";

const GetTeacherScheduals = async () => {
  try {
    const response = await http.get("/Schedual/GetTeacherScheduals", {
      params: params,
    });
    return response;
  } catch (error) {
    return [];
  }
};

export default GetTeacherScheduals;
