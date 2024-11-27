import axios from "axios";

const GetEventsList = () => {
  try {
    const response = axios.get(
      "https://67278458270bd0b97552ba83.mockapi.io/Events"
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

export default GetEventsList;
