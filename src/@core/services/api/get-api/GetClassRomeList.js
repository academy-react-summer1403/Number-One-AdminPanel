import http from "../../interceptor";

const GetClassRomeList = async () => {
  try {
    const response = await http.get("/ClassRoom");
    return response;
  } catch (error) {
    return [];
  }
};

export default GetClassRomeList;
