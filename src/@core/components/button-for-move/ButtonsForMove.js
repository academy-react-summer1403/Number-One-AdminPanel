import { ArrowLeft, ArrowRight } from "react-feather";
import { Button } from "reactstrap";

const ButtonsForMove = ({ stepper, form = true }) => {
  return (
    <div className="d-flex justify-content-between mt-4">
      <Button
        color="secondary"
        className="btn-prev"
        outline
        // disabled
        onClick={() => stepper.previous()}
      >
        <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
        <span className="align-middle d-sm-inline-block d-none">قبلی</span>
      </Button>
      <Button
        type="submit"
        color="primary"
        className="btn-next"
        onClick={() => {
          form && stepper.next();
        }}
      >
        <span className="align-middle d-sm-inline-block d-none">بعدی</span>
        <ArrowRight
          size={14}
          className="align-middle ms-sm-25 ms-0"
        ></ArrowRight>
      </Button>
    </div>
  );
};

export default ButtonsForMove;
