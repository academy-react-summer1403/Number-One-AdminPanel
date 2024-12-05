import http from "../../interceptor";

const GetJobHistory = async () => {
  try {
    const response = await http.get("/SharePanel/GetJobHistoriesAdmin");
    return response;
  } catch (error) {
    return [];
  }
};

export default GetJobHistory;
