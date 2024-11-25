import http from "../../interceptor";

const GetUserPayment = async (Params) => {
//   console.log(Params);
  try {
    const result = await http.get(`/CoursePayment/UserPayList`, {
      params: Params,
    });
    return result;
  } catch (error) {
    console.log(error);
    // return [];
  }
};

export default GetUserPayment;
