import http from "../../interceptor";

const GetTermList = async () => {
  try {
    const response = await http.get("/Term");
    return response;
  } catch (error) {
    return [];
  }
};

export default GetTermList;
