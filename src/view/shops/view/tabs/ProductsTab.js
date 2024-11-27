import { Fragment, useState } from "react";
import { Button, Card, Table } from "reactstrap";
import HeaderTable from "../../../../@core/components/header-table/HeaderTable";
import { ShopProductTableTitles } from "../../../../@core/constants/shops";
import CustomPagination from "../../../../@core/components/pagination";
import { useQueryWithoutDependencies } from "../../../../utility/hooks/useCustomQuery";
import { GetAllProducts } from "../../../../@core/services/api/get-api";
import { Link } from "react-router-dom";

const ProductsTab = ({ courseId }) => {
  // Getting Product Data From Api With Out Params
  const { data: productsData } = useQueryWithoutDependencies(
    "GET_ALL_PRODUCTS",
    GetAllProducts
  );

  // Getting products related to the store
  const products = productsData?.filter((item) => item.shopId == courseId);
  // console.log(products)

  // Pagination
  const [PageNumber, setPageNumber] = useState(1);
  const [RowsOfPage, setRowsOfPage] = useState(6);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + RowsOfPage;
  const handleWithOutDispatch = (page) => {
    const newOffset = (page.selected * RowsOfPage) % products?.length;
    setItemOffset(newOffset);
  };
  return (
    <Fragment>
      <Card>
        <div className="react-dataTable" style={{ overflowX: "auto" }}>
          <Table hover>
            <HeaderTable titles={ShopProductTableTitles} />
            {products &&
              products?.map((item, index) => {
                return (
                  <tbody key={index}>
                    <tr
                      className="text-center"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      <td className=" px-0">{item?.title}</td>
                      <td
                        className=" px-1 text-truncate d-inline-block pt-2"
                        style={{ width: "270px" }}
                      >
                        {item?.discribe}
                      </td>
                      <td className=" px-0">{item?.exist}</td>
                      <td>
                        <Link
                          to={"/product/view/" + item.id}
                          state={{ tab: "3" }}
                        >
                          <Button>جزئیات</Button>
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
          </Table>
        </div>
      </Card>
      <CustomPagination
        total={products?.length}
        current={PageNumber}
        rowsPerPage={RowsOfPage}
        handleClickFunc={handleWithOutDispatch}
      />
    </Fragment>
  );
};

export default ProductsTab;
