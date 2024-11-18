import http from "../../interceptor";

const GetCommentsManage = async () => {
  try {
    // console.log("Fetching started...");
    const result = await http.get("/Course/CommentManagment");
    return result;
  } catch (error) {
    console.log(error);
    // return [];
  }
};

export default GetCommentsManage;
