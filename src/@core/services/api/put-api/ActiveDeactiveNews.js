import http from "../../interceptor";

const ActiveDeactiveNews = async (data) => {
  try {
    const response = await http.put("/News/ActiveDeactiveNews", data);
    return response;
  } catch (error) {
    return [];
  }
};

export default ActiveDeactiveNews
