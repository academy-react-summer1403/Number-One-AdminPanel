import http from "../../interceptor";

const GetTermDetails = async (id) => {
  try {
    const response = await http.get(`/Term/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default GetTermDetails;
