import http from "../../interceptor";

const GetAssistanceWorkDetail = async (id) => {
  try {
    const response = await http.get(`/AssistanceWork/${id}`);
    return response
  } catch (error) {
    console.log(error);
  }
};

export default GetAssistanceWorkDetail;
