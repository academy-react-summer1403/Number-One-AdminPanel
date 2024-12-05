import { Calendar, getAllDatesInRange } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import weekends from "react-multi-date-picker/plugins/highlight_weekends";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header";
import "./calender.css";
import DateObject from "react-date-object";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const SchedualCalendar = ({handleFilterDate}) => {
  const [dates, setDates] = useState([]);
  const [allDates, setAllDates] = useState([]);
  const dispatch = useDispatch();

  const handleRangeDate = () => {
    if (allDates.length > 1) {
      const start = new DateObject(allDates[0])
        .convert(gregorian, gregorian_en)
        .format("YYYY-MM-DD");
      const end = new DateObject(allDates[allDates.length - 1])
        .convert(gregorian, gregorian_en)
        .format("YYYY-MM-DD");

      dispatch(
        handleFilterDate({
          startDate: start,
          endDate: end,
        })
      );
    }
  };

  useEffect(() => {
    handleRangeDate();
  }, [dates]);

  return (
    <div>
      <Calendar
        range
        value={dates}
        onChange={(dateObjects) => {
          setDates(dateObjects);
          setAllDates(getAllDatesInRange(dateObjects));
        }}
        calendar={persian}
        locale={persian_fa}
        plugins={[
          weekends(),
          <DatePanel
            style={{ padding: "0px" }}
            markFocused
            position="bottom"
          />,
          <DatePickerHeader position="top" size="medium" />,
        ]}
      />
    </div>
  );
};

export default SchedualCalendar;
