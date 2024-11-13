import { useState } from "react";
import CustomPagination from "../../../@core/components/pagination";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";

const UserActiveComments = ({ columns, data }) => {
  // Pagination
  const currentItems = 5;

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + currentItems;
  const handleWithOutDispatch = (page) => {
    const newOffset = (page.selected * currentItems) % data?.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="divider divider-start">
        <div className="divider-text fs-2">کامنت های تایید شده</div>
      </div>
      <DataTable
        noHeader
        responsive
        columns={columns}
        data={data?.slice(itemOffset, endOffset)}
        className="react-dataTable"
        sortIcon={<ChevronDown size={10} />}
      />
      <div className="w-100 d-flex justify-content-end">
        <CustomPagination
          total={data?.length}
          current={1}
          rowsPerPage={currentItems}
          handleClickFunc={handleWithOutDispatch}
        />
      </div>
    </>
  );
};

export default UserActiveComments;
