// ** Icons Imports
import { Award } from "react-feather";
// ** Custom Components
import Avatar from "@components/avatar";
// ** Reactstrap Imports
import { Card, CardBody, CardText } from "reactstrap";
// ** Images
import decorationLeft from "../../assets/images/elements/decore-left.png";
import decorationRight from "../../assets/images/elements/decore-right.png";
import { useQueryWithDependencies } from "../../utility/hooks/useCustomQuery";
import { GetAdminInfo, GetDashboardReport } from "../../@core/services/api/get-api";

const CardCongratulations = () => {
  const AdminId = localStorage.getItem("id") && localStorage.getItem("id");
  const { data } = useQueryWithDependencies(
    "GET_ADMIN_INFO",
    GetAdminInfo,
    null,
    AdminId
  );
  const { data : dashboardReport } = useQueryWithDependencies(
    "GET_DASHBOARD_REPORT",
    GetDashboardReport,
    null,
    null
  );

  return (
    <Card className="card-congratulations">
      <CardBody className="text-center">
        <img
          className="congratulations-img-left"
          src={decorationLeft}
          alt="decor-left"
        />
        <img
          className="congratulations-img-right"
          src={decorationRight}
          alt="decor-right"
        />
        <Avatar
          icon={<Award size={20} />}
          className="shadow"
          color="primary"
          size="xl"
        />
        <div className="text-center">
          <h1 className=" text-white">{data?.fName} عزیز تبریک! </h1>
          <CardText className='m-auto w-75'>
            مبلغ تمام پرداختی دوره های تیم نامبر وان به<strong>{" "+dashboardReport?.allPaymentCost}</strong> تومان رسید. 
          </CardText>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardCongratulations;
