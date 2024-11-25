import { Badge, Button, Table, Tooltip } from "reactstrap";
import { useEffect, useState } from "react";
import IMG from "../../../../assets/images/portrait/small/man.jpg";
import { Link, useNavigate } from "react-router-dom";
import { Eye } from "react-feather";
import HeaderTable from "../../../../@core/components/header-table/HeaderTable";
import { GetAllPayment, GetUserPayment } from "../../../../@core/services/api/get-api";
import CustomPagination from "../../../../@core/components/pagination";
import { PaymentCoursesTableTitles } from "../../../../@core/constants/courses";
import AcceptPaymentModal from "./AcceptPaymentModal";

const PaymentOfCourses = ({ courseId }) => {
  const navigate = useNavigate();
  // Pagination statements
  const [PageNumber, setPageNumber] = useState(1);
  const [RowsOfPage, setRowsOfPage] = useState(15);

  // Payment statements
  const [PaymentsData, setPaymentsData] = useState([]);
  const [paymentReceipt, setPaymentReceipt] = useState(undefined);
  const [paymentId, setPaymentId] = useState(null);

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Getting Courses Reserved from API
  const getAllPayments = async () => {
    try {
      const result = await GetAllPayment(courseId);
      // console.log(result);
      const resultFilter = result.filter((element) => {
        return element.accept === false;
      });
      setPaymentsData(resultFilter);
    } catch (error) {
      throw new Error("ERROR: ", error);
    }
  };
  

  useEffect(() => {
    if (courseId) {
      getAllPayments();
    }
  }, [courseId]);

  // Subject to approval or disapproval of course payment
  const handleAcceptPayment = async (studentId, courseId) => {

    const result = await GetUserPayment({
      CourseId: courseId,
      StudentId: studentId,
    });
    if (result) {
      // console.log(result);
      setPaymentReceipt(result[0].paymentInvoiceImage);
      setPaymentId(result[0].paymentId);
    }
  };

  // Pagination
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + RowsOfPage;
  const handleWithOutDispatch = (page) => {
    const newOffset = (page.selected * RowsOfPage) % PaymentsData.length;
    setItemOffset(newOffset);
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <Table hover>
        <HeaderTable titles={PaymentCoursesTableTitles} />
        <tbody style={{ overflowX: "auto" }}>
          {PaymentsData &&
            PaymentsData.slice(itemOffset, endOffset)?.map((item, index) => {
              return (
                <tr key={index} className="text-right">
                  <td
                    onClick={() => {
                      navigate("/users/view/" + item.studentId);
                    }}
                  >
                    <img
                      src={IMG}
                      className="me-75"
                      alt="img"
                      height="20"
                      width="20"
                    />
                    <span className="align-middle fw-bold">
                      {item.studentName}{" "}
                    </span>
                  </td>
                  <td
                    onClick={() => {
                      navigate("/courses/view/" + item.courseId);
                    }}
                  >
                    {item.title}
                  </td>
                  <td className="text-center">
                    <Badge pill color="light-danger" className="me-1">
                      تایید نشده
                    </Badge>
                  </td>
                  <td className=" px-0">
                    <div
                      id="ControlledExample"
                      onClick={() => {
                        handleAcceptPayment(item.studentId, item.courseId);
                        setShowModal(!showModal);
                      }}
                      className="text-center"
                    >
                      {" "}
                      <Eye size={20} />
                    </div>
                    <Tooltip
                      placement="top"
                      isOpen={tooltipOpen}
                      target="ControlledExample"
                      toggle={() => setTooltipOpen(!tooltipOpen)}
                    >
                      رسید پرداخت
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <AcceptPaymentModal
        showModal={showModal}
        setShowModal={setShowModal}
        paymentId={paymentId}
        paymentReceipt={paymentReceipt}
        refetch={getAllPayments}
      />
      <CustomPagination
        total={PaymentsData?.length}
        current={PageNumber}
        rowsPerPage={RowsOfPage}
        handleClickFunc={handleWithOutDispatch}
      />
    </div>
  );
};

export default PaymentOfCourses;
