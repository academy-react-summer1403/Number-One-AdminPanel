import http from "../../interceptor";

const GetClassRomeDetail = async (id) => {
  try {
    const response = await http.get(`/ClassRoom/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default GetClassRomeDetail
