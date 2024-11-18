import http from "../../interceptor";

const GetDashboardReport = async () => {
  try {
    const result = await http.get("/Report/DashboardReport");
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default GetDashboardReport;
