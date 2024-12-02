import http from "../../interceptor";

const GetSocialGroupDetails = async (id) => {
  try {
    const result = await http.get(
      `/CourseSocialGroup/${id}`
    );
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default GetSocialGroupDetails;
