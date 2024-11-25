import http from "../../interceptor";

const GetAllPayment = async (courseId) => {
  // console.log(courseId)
  try {
    const result = await http.get(`/CoursePayment?CourseId=${courseId}`);
    return result;
  } catch (error) {
    console.log(error);
    // return [];
  }
};

export default GetAllPayment;
