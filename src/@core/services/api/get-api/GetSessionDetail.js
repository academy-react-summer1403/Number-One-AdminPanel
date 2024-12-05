import http from "../../interceptor";

const GetSessionDetail = async (id) => {
  if (id) {
    try {
      const response = await http.get(`/Session/SessionDetail?SessionId=${id}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
};

export default GetSessionDetail;
