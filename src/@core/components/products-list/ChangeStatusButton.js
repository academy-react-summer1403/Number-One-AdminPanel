import { Fragment, useState } from "react";
import { Activity } from "react-feather";
import { Button, Tooltip } from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ChangeStatusButton = ({ handleActiveOrDetective, id, status }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const MySwal = withReactContent(Swal);

  const handleSuspendedClick = (boolean, id) => {
    return MySwal.fire({
      title: "آیا مطمعن هستید؟",
      text: "البته امکان بازگشت نیز وجود دارد ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: " بله ",
      cancelButtonText: " لغو ",

      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        handleActiveOrDetective(boolean, id);
        MySwal.fire({
          icon: "success",
          title: "موفقیت ",
          text: "عملیات با موفقیت انجام گردید",
          confirmButtonText: " باشه ",

          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: "لغو",
          text: "عملیات لغو شد",
          icon: "error",
          confirmButtonText: " باشه ",

          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  };

  return (
    <Fragment>
      <Tooltip
        placement="top"
        isOpen={tooltipOpen}
        target="ChangeStatus"
        toggle={() => setTooltipOpen(!tooltipOpen)}
      >
        تغییر وضیعت
      </Tooltip>
      <Button
        id="ChangeStatus"
        className="d-flex align-items-center justify-content-center p-0"
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "100%",
          position: "absolute",
          top: "5px",
          left: "5px",
        }}
        color="primary"
        onClick={() => {
          status
            ? handleSuspendedClick(false, id)
            : handleSuspendedClick(true, id);
        }}
      >
        <Activity size={20} />
      </Button>
    </Fragment>
  );
};

export default ChangeStatusButton;
