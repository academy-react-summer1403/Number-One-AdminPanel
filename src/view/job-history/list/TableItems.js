import { Badge } from "reactstrap";
import ChangeMoment from "../../../utility/moment";
import { Edit } from "react-feather";
import { UserDetails } from "../../../@core/services/api/get-api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleUserDetails } from "../store";
import { useMutation } from "@tanstack/react-query";
import { UpdateJobHistoryShow } from "../../../@core/services/api/post-api";

const TableItems = ({ item, refetch }) => {
  const [existDetail, setExistDetail] = useState();
  const UserDetail = useSelector((state) => state.JobHistorySlice.UserDetails);
  const dispatch = useDispatch();

  const handleGet = async () => {
    const user = await UserDetails(item.userId);
    if (user) {
      let details = {
        userName: user?.fName + " " + user?.lName,
        id: user?.id,
      };
      dispatch(handleUserDetails(details));
      setExistDetail(details);
    }
  };

  useEffect(() => {
    let exist = UserDetail.find((ev) => ev.id == item.userId);
    if (exist) {
      setExistDetail(exist);
    } else {
      handleGet();
    }
  }, [item]);

  const { mutate } = useMutation({
    mutationKey: ["UPDATE_SHOW"],
    mutationFn: (data) => {
      UpdateJobHistoryShow(data, refetch);
    },
  });

  return (
    <tr className="text-center">
      <td className="px-0" style={{ width: "120px" }}>
        {existDetail ? existDetail.userName : ""}
      </td>
      <td className="px-0" style={{ width: "180px" }}>
        {item.jobTitle}
      </td>
      <td className="px-0" style={{ width: "250px" }}>
        {item.aboutJob}
      </td>
      <td className="px-0" style={{ width: "180px" }}>
        {ChangeMoment(item.workStartDate, "YYYY/MM/DD", "persian")} تا{" "}
        {ChangeMoment(item.workEndDate, "YYYY/MM/DD", "persian")}
      </td>
      <td className="px-0" style={{ width: "150px" }}>
        {item.companyName}
      </td>
      <td className="px-0" style={{ width: "100px" }}>
        <Badge
          color={item.showInFirstPage ? "light-primary" : "light-danger"}
          className="me-1"
        >
          {item.showInFirstPage ? "فعال" : "غیرفعال"}
        </Badge>
      </td>
      <td className="px-0" style={{ width: "100px" }}>
        <Badge
          color={item.inWork ? "light-primary" : "light-danger"}
          className="me-1"
        >
          {item.inWork ? "فعال" : "غیرفعال"}
        </Badge>
      </td>
      <td
        onClick={() => {
          item.showInFirstPage
            ? mutate({ JobId: item.id, show: false })
            : mutate({ JobId: item.id, show: true });
        }}
        style={{ width: "120px" }}
        className="px-0"
      >
        <Edit className="me-50" size={15} />{" "}
        <span className="align-middle">ویرایش</span>
      </td>
    </tr>
  );
};

export default TableItems;
