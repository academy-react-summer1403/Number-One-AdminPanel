import http from "../../interceptor";

const GetCoursePayment = async (id) => {
  try {
    const result = await http.get(
      `/CoursePayment/ListOfWhoIsPay?CourseId=${id}`
    );
    return result;
  } catch (error) {
    console.log(error);
    // return [];
  }
};

export default GetCoursePayment;
