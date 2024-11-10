// ** User List Component
import Table from "./Table";
import UsersReport from "./Reports";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** Styles
import "@styles/react/apps/app-users.scss";

const UsersList = () => {
  return (
    <div className="app-user-list">
      <Row>
        <UsersReport />
        <Col sm="12">
          <Table />
        </Col>
      </Row>
    </div>
  );
};

export default UsersList;
