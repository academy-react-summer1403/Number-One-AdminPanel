import http from "../../interceptor";

const GetCommentsManage = async (apiParams) => {
  // console.log(apiParams);
  try {
    // console.log("Fetching started...");
    const result = await http.get("/Course/CommentManagment", {
      params: apiParams,
    });
    return result;
  } catch (error) {
    console.log(error);
    // return [];
  }
};

export default GetCommentsManage;
