import http from "../../interceptor";

const GetBuildingDetails = (id) => {
  try {
    const response = http.get(`/Building/${id}`);
    return response;
  } catch (error) {
    return false;
  }
};

export default GetBuildingDetails
