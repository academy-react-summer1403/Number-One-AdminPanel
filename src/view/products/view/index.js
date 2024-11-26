// React Imports
import { useState } from "react";
import { useParams } from "react-router-dom";

// Reactstrap
import { Col, Row } from "reactstrap";

// Custom Components
import InfoCard from "../../../@core/components/item-detail-components/InfoCard";
import { ProductsInformation } from "../../../@core/constants/products-manage/Details";
import ProductsTabs from "./Tabs";
import EditProducts from "./EditProducts";

// Query
import { useMutation } from "@tanstack/react-query";
import { useQueryWithDependencies } from "../../../utility/hooks/useCustomQuery";

// Api
import {
  GetProductsDetails,
  GetShopDetails,
} from "../../../@core/services/api/get-api";
import { UpdateProducts } from "../../../@core/services/api/put-api";

// Slider
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Style
import "@styles/react/libs/swiper/swiper.scss";

const DetailProductsPage = () => {
  // UseState
  const [active, setActive] = useState("1");
  const [editModal, setEditModal] = useState(false);

  // Id
  const { id } = useParams();

  // Get Products Details
  const {
    data: details,
    isSuccess: detailsSuccess,
    refetch,
  } = useQueryWithDependencies(
    "GET_PRODUCTS_DETAILS",
    GetProductsDetails,
    id,
    id
  );

  // Handle Change Tab
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  // Handle Active Or Deactivate
  const { mutate: activeOrDeactive } = useMutation({
    mutationKey: ["ACTIVE_OR_DEACTIVE"],
    mutationFn: (res) => {
      UpdateProducts(id, { isActive: res }, refetch);
    },
  });

  // Handle Get Shop Details
  const { data: shopDetails, isSuccess } = useQueryWithDependencies(
    "GET_SHOP_DETAILS",
    GetShopDetails,
    details?.shopId,
    details?.shopId
  );

  // Show Modal
  const toggle = () => setEditModal(!editModal);

  const renderSlider = () => {
    SwiperCore.use([Navigation]);

    const activePic = details?.pictureList?.filter(
      (item) => item.isActive === true
    );

    const params = {
      className: "swiper-responsive-breakpoints swiper-container px-4 py-2",
      slidesPerView: 1,
      spaceBetween: 5,
      navigation: true,
    };

    return (
      <Swiper
        {...params}
        style={{ height: "280px", width: "100%" }}
        className="p-0"
      >
        {activePic?.map((item, index) => (
          <SwiperSlide key={index}>
            <img
              alt="user-avatar"
              src={item.href}
              className="w-100 h-100 img-fluid rounded mb-1"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  };

  return (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <InfoCard
            setEditModal={setEditModal}
            activeOrDeactive={activeOrDeactive}
            fields={ProductsInformation(
              detailsSuccess && details,
              isSuccess && shopDetails
            )}
            detailParams={detailsSuccess && details}
            variant={"products"}
            renderImageSection={renderSlider}
          />
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <ProductsTabs
            active={active}
            toggleTab={toggleTab}
            details={detailsSuccess && details}
            refetch={refetch}
          />
        </Col>
      </Row>
      <EditProducts isOpen={editModal} toggle={toggle} refetch={refetch} />
    </div>
  );
};
export default DetailProductsPage;
