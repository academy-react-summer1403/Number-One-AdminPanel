import http from "../../interceptor";

const GetAdminScheduals = async (params) => {
  try {
    const response = await http.get("/Schedual/GetAdminScheduals", {
      params: params,
    });
    return response;
  } catch (error) {
    return [];
  }
};

export default GetAdminScheduals;
