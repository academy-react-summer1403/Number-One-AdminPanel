import http from "../../interceptor";

const GetTechnologies = async () => {
  try {
    const result = await http.get("/Home/GetTechnologies");
    return result;
  } catch (error) {
    console.log(error);
    //   return [];
  }
};
export default GetTechnologies;
