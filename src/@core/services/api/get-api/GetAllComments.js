import http from "../../interceptor";

const GetAllComments = async (params) => {
  try {
    const result = await http.get(`/Course/CommentManagment`, {
      params: params,
    });
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default GetAllComments;
