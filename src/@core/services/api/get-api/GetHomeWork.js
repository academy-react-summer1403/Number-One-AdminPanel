import http from "../../interceptor";

const GetHomeWork = async (id) => {
  try {
    const response = await http.get(
      `/Session/GetSessionHomeWork?SessionId=${id}`
    );
    return response;
  } catch (error) {
    return [];
  }
};

export default GetHomeWork;
