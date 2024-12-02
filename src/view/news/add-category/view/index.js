import React from "react";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import ImageFallBack from "../../../../@core/components/image-fallback";
import { useQueryWithDependencies } from "../../../../utility/hooks/useCustomQuery";
import { GetNewsCategoryWithId } from "../../../../@core/services/api/get-api";
import fallback from "../../../../assets/images/cards/coursee.jfif";
import ChangeMoment from "../../../../utility/moment";

const CategoryNewsDetails = ({ showModal, setShowModal, id }) => {
  console.log(id);

  const { data: categoryDetails } = useQueryWithDependencies(
    "GET_CATEGORY_DETAILS",
    GetNewsCategoryWithId,
    id,
    id
  );
  //   console.log(categoryDetails)

  return (
    <div className="vertically-centered-modal ">
      <Modal
        className="modal-dialog-centered modal-lg"
        isOpen={showModal}
        toggle={(old) => setShowModal(!old)}
      >
        <ModalHeader toggle={(old) => setShowModal(!old)}>
          جزئیات دسته بندی
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col sm="4">
              <ImageFallBack
                src={categoryDetails?.image}
                fallback={fallback}
                // style={{ height: "120px" }}
                // className={'w-50 h-50'}
              />
            </Col>
            <Col className="card text-wrap py-1 my-auto" sm="8">
              <h1>{categoryDetails?.categoryName}</h1>
              <p>
                {" "}
                تاریخ ایجاد:{" "}
                <span className="ms-1">
                  {" "}
                  {ChangeMoment(
                    categoryDetails?.insertDate,
                    "YYYY/MM/DD",
                    "persian"
                  )}
                </span>{" "}
              </p>
              <p>
                عنوان گوگل:
                <span className="ms-1">{categoryDetails?.googleTitle}</span>
              </p>
              <p className="card-text text-wrap">
                توضیحات گوگل:
                <span className="ms-1">{categoryDetails?.googleDescribe}</span>
              </p>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CategoryNewsDetails;
