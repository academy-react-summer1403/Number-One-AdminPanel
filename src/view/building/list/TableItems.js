import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import ChangeMoment from "../../../utility/moment";
import { Activity, Edit, MoreVertical } from "react-feather";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useMutation } from "@tanstack/react-query";
import { ActiveDeActiveBuilding } from "../../../@core/services/api/put-api";
import axios from "axios";
import { useEffect, useState } from "react";

const TableItems = ({ item, refetch, id, status, toggleModal, setId }) => {
  const MySwal = withReactContent(Swal);
  const [address, setAddress] = useState("");

  const { mutate } = useMutation({
    mutationKey: ["ACTIVE_DEACTIVE"],
    mutationFn: (data) => {
      ActiveDeActiveBuilding(data, refetch);
    },
  });

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
        mutate({ active: boolean, id: id });
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

  const getAddress = async () => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${item.latitude}&lon=${item.longitude}&format=json`
      );
      setAddress(response.data.display_name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddress();
  }, [item]);

  return (
    <tr className="text-center">
      <td className="px-0" style={{ width: "30px" }}>
        {item.id} #
      </td>
      <td style={{ width: "280px" }} className="px-0">
        {item.buildingName}
      </td>
      <td style={{ width: "80px" }} className="px-0">
        {item.floor}
      </td>
      <td className="px-0 " style={{ width: "80px" }}>
        <Badge
          color={item.active ? "light-primary" : "light-danger"}
          className="me-1"
        >
          {item.active ? "فعال" : "غیرفعال"}
        </Badge>
      </td>
      <td className="px-0" style={{ width: "120px" }}>
        {ChangeMoment(item.workDate, "YYYY/MM/DD", "persian")}
      </td>
      <td className="px-0" style={{ width: "280px" }}>
        {address}
      </td>
      <td style={{ width: "100px" }} className="px-0">
        <UncontrolledDropdown direction="start">
          <DropdownToggle
            className="icon-btn hide-arrow"
            color="transparent"
            size="sm"
            caret
          >
            <MoreVertical size={15} />
          </DropdownToggle>
          <DropdownMenu className="d-flex flex-column p-0">
            <DropdownItem
              href="/"
              onClick={(e) => {
                e.preventDefault();
                status
                  ? handleSuspendedClick(false, id)
                  : handleSuspendedClick(true, id);
              }}
            >
              <Activity className="me-50" size={15} />{" "}
              <span className="align-middle">
                {item.active ? "غیرفعال" : "فعال"}
              </span>
            </DropdownItem>
            <DropdownItem
              href="/"
              onClick={(e) => {
                e.preventDefault();
                toggleModal();
                setId(id);
              }}
            >
              <Edit className="me-50" size={15} />{" "}
              <span className="align-middle">ویرایش</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
    </tr>
  );
};

export default TableItems;
