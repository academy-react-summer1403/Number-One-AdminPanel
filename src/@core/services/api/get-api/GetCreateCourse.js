import http from "../../interceptor";

const GetCreateCourse = async () => {
  try {
    const result = await http.get("/Course/GetCreate");
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default GetCreateCourse;
