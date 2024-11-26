import http from "../../interceptor";

const GetCourseStatus = async () => {
  try {
    const result = await http.get("/Status");
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default GetCourseStatus;
