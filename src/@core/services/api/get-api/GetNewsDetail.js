import http from "../../interceptor";

const GetNewsDetail = async (id) => {
  try {
    const response = await http.get(`/News/${id}`);
    return response;
  } catch {
    return [];
  }
};

export default GetNewsDetail;
