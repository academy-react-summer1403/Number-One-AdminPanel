import axios from "axios";

const GetAllEvents = async () => {
  try {
    const response = await axios.get(
      "https://67278458270bd0b97552ba83.mockapi.io/Events"
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

export default GetAllEvents
