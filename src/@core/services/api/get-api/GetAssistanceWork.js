import http from "../../interceptor";

const GetAssistanceWork = async () => {
  try {
    const response = await http.get("/AssistanceWork");
    return response;
  } catch (error) {
    return [];
  }
};

export default GetAssistanceWork;
