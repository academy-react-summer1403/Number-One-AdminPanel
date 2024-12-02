import http from "../../interceptor";

const GetDepartmentDetails = (id) => {
  try {
    const response = http.get(`/Department/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default GetDepartmentDetails;
