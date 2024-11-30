import http from "../../interceptor";

const GetDepartmentList = async () => {
  try {
    const response = await http.get("/Department");
    return response;
  } catch (error) {
    return [];
  }
};

export default GetDepartmentList;
