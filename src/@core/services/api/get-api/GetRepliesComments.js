import http from "../../interceptor";

const GetRepliesComments = async (id) => {
  try {
    const response = await http.get(`/News/GetRepliesComments?Id=${id}`);
    return response;
  } catch {
    return [];
  }
};

export default GetRepliesComments;
