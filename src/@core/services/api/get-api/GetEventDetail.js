import axios from "axios";

const GetEventDetail = async (id) => {
  try {
    const response = await axios.get(
      `https://67278458270bd0b97552ba83.mockapi.io/Events/${id}`
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

export default GetEventDetail;
