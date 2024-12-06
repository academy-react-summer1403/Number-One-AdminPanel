import { Col, Row } from "reactstrap";
import StatsWithLineChart from "./StatsWithLineChart";
import { useQueryWithoutDependencies } from "../../utility/hooks/useCustomQuery";
import {
  GetAllEvents,
  GetAllProducts,
  GetShopList,
} from "../../@core/services/api/get-api";
import { useEffect, useState } from "react";
import { generalStatistics2 } from "../../@core/constants/dashboard/Options";

const CartWithLine = () => {
  const [data, setData] = useState([]);

  // Get All Events With Out Params
  const { data : eventData ,isSuccess : eventSuccess} = useQueryWithoutDependencies("GET_EVENTS", GetAllEvents);

  // Getting shop data from Api With use Query
  const { data: shopData  ,isSuccess : shopSuccess } = useQueryWithoutDependencies(
    "GET_SHOP_LIST",
    GetShopList
  );
  // Getting Product Data From Api With Out Params
  const { data: productData , isSuccess : productSuccess } = useQueryWithoutDependencies(
    "GET_ALL_PRODUCTS",
    GetAllProducts
  );

  useEffect(() => {
    if (eventData && shopData && productData) {
      setData(
        generalStatistics2(eventData, shopData, productData)
      );
    }
  }, [eventSuccess, shopSuccess, productSuccess]);

  console.log(data)

  return (
    <div className="app-user-list">
      <Row>
        {data?.map((item,index)=> (
        <Col key={index} lg="4" sm="6" xs="12" className="">
          <StatsWithLineChart 
           icon={<item.icon size={21} />}
           color={item.color}
           stats={item.title}
           statTitle={item.subtitle}

           series={[{name: item.subtitle , data:['150','200','125','225','200']}]}

           type='line'
          />
        </Col>
        ))}
     
      </Row>
    </div>
  );
};

export default CartWithLine;
