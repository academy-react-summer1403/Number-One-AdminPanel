// ** Icons Imports
import { Search } from "react-feather";

// ** Reactstrap Imports
import { Row, Col, InputGroup, Input, InputGroupText } from "reactstrap";
import { useDispatch } from "react-redux";

const ListSearchbar = ({ QueryFunction }) => {
  const dispatch = useDispatch();

  return (
    <div id="ecommerce-searchbar" className="ecommerce-searchbar">
      <Row className="mt-1">
        <Col sm="12">
          <InputGroup className="input-group-merge" style={{ height: "50px" }}>
            <Input
              className="search-product"
              placeholder="جستجو"
              onChange={(e) => dispatch(QueryFunction(e.target.value))}
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
