import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Col, Row } from "reactstrap";
import GetShopDetails from "../../../@core/services/api/get-api/GetShopDetails";
import { UpdateShop } from "../../../@core/services/api/put-api";
import { useQueryWithDependencies } from "../../../utility/hooks/useCustomQuery";
import InfoCard from "../../../@core/components/item-detail-components/InfoCard";
import { ShopInfo } from "../../../@core/constants/shops";
import EditShop from "./EditShop";
import EditShopValidation from "../../../@core/validations/EditShop_Validation";
import ShopTabs from "./tabs/DetailsTabs";
import fallback from "../../../assets/images/portrait/small/shops.png";

const ShopDetails = () => {
  const { id } = useParams();
  // show and hide modal
  const [editModal, setEditModal] = useState(false);
  const toggle = () => setEditModal(!editModal);

  // Getting data from Api with use Query
  const { data, isSuccess, refetch } = useQueryWithDependencies(
    "GET_SHOP_DETAILS",
    GetShopDetails,
    id,
    id
  );

  // handle Active and DeActive shop
  const { mutate: activeMutate } = useMutation({
    mutationKey: ["ACTIVE_AND_DETECTIVE_SHOP"],
    mutationFn: (boolean) => {
      UpdateShop(id, { isActive: boolean }, refetch);
    },
    onSuccess: async () => {
      await refetch();
    }
  });
  
  return (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 0 }} md={{ order: 0, size: 5 }}>
          <InfoCard
            setEditModal={setEditModal}
            activeOrDeactive={activeMutate}
            detailParams={data}
            fields={ShopInfo(data)}
            variant={"shop"}
            fallback={fallback}
          />
        </Col>
        <EditShop
          data={isSuccess && data}
          refetch={refetch}
          isOpen={editModal}
          toggle={toggle}
          validation={EditShopValidation}
        />
        <Col xl="8" lg="7" xs={{ order: 1 }} md={{ order: 1, size: 7 }}>
          <ShopTabs data={data} refetch={refetch} />
        </Col>
      </Row>
    </div>
  );
};

export default ShopDetails;
