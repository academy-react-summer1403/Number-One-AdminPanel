import React from "react";
import { Card, CardHeader, CardText, Col, Row } from "reactstrap";
import { useQueryWithDependencies } from "../../utility/hooks/useCustomQuery";
import { GetSiteSetting } from "../../@core/services/api/get-api";
import Img from "../../assets/images/cards/level.png";

const SiteSettingWrapper = () => {
  // getting Setting data from Api with use Query with dependency
  const { data: siteData, refetch } = useQueryWithDependencies(
    "GET_SITE_SETTING",
    GetSiteSetting,
    null,
    1
  );

  const siteInfo = [
    { label: "عنوان سایت", value: siteData?.title },
    { label: "توضیحات سایت", value: siteData?.describe },
    { label: "عنوان گوگل", value: siteData?.googleTitle },
    { label: "توضیحات گوگل", value: siteData?.googleDescribe },
    { label: "درباره سایت", value: siteData?.aboutUs },
    { label: " سیاست حفظ حریم خصوصی", value: siteData?.privacyPolicy },
  ];

  return (
    <Row>
      <Col sm={"7"} className=" h-75">
        <div className="shadow p-1 card">
          {siteInfo.slice(0, 4).map((item, index) => {
            return (
              <h4 key={index} className="card-text text-wrap my-1 text-primary">
                {" "}
                {item.label} :{" "}
                <span className="text-secondary">{item.value}</span>
              </h4>
            );
          })}
        </div>
        {siteInfo.slice(4, 6).map((item, index) => {
          return (
            <div key={index} className="shadow p-1 card text-primary">
              <p>
                {" "}
                {item.label} :{" "}
                <span className="text-secondary">{item.value}</span>{" "}
              </p>
            </div>
          );
        })}
      </Col>
      <Col sm={"5"}>
        <div className="shadow p-1 card">
          {/* siteData?.logoImageAddress */}
          <img className="" src={Img} style={{ height: "250px" }} />
        </div>
        <div className="">
          <Row>
            <Col xs="5" className="card p-1 ms-1">
              <h5 className="text-primary">شماره تماس :</h5>
              <p>{siteData?.contactUs}</p>
            </Col>
            <Col xs="5" className="card p-1 ms-4">
              <h5 className="text-primary"> سئو سایت :</h5>
              <p>{siteData?.seoSchema}</p>
            </Col>
          </Row>
          <div className="shadow p-1 card">
            <h5 className="text-primary"> جمله کلیدی سایت :</h5>
            <p>{siteData?.keyword}</p>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default SiteSettingWrapper;
