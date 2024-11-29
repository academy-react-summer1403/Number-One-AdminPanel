import http from "../../interceptor";

const GetBuildingList = async () => {
  try {
    const response = await http.get("/Building");
    return response;
  } catch (error) {
    return [];
  }
};

export default GetBuildingList;
