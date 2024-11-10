import http from "../../interceptor";

const GetUserComments = async (id) => {
  try {
    const response = await http.get(`/Course/CommentManagment?userId=${id}`);
    return response;
  } catch {
    return false;
  }
};

export default GetUserComments;
