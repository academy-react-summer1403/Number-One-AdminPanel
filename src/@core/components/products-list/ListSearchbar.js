// ** Icons Imports
import { Search } from "react-feather";

// ** Reactstrap Imports
import { Row, Col, InputGroup, Input, InputGroupText } from "reactstrap";
import { useDispatch } from "react-redux";
import { useRef } from "react";

const ListSearchbar = ({ QueryFunction ,width}) => {
  const dispatch = useDispatch();
  const ref = useRef();

  const handleSetSearch = (e) => {
    clearTimeout(ref.current);
    const timeOut = setTimeout(() => {
      dispatch(QueryFunction(e));
    }, 1000);
    ref.current = timeOut;
  };

  return (
    <div id="ecommerce-searchbar" className="ecommerce-searchbar">
      <Row className="mt-1">
        <Col sm="12">
          <InputGroup className={`input-group-merge ${width}`} style={{ height: "50px" }}>
            <Input
              className="search-product"
              placeholder="جستجو"
              onChange={(e) => handleSetSearch(e.target.value)}
            />
            <InputGroupText>
              <Search className="text-muted" size={20} />
            </InputGroupText>
          </InputGroup>
        </Col>
      </Row>
    </div>
  );
};

export default ListSearchbar;
