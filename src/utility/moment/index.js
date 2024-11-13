import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import DateObject from "react-date-object";

const ChangeMoment = (date, format, calendar) => {
  const variants = {
    persian: new DateObject(date).convert(persian, persian_fa).format(format),
    english: new DateObject(date)
      .convert(gregorian, gregorian_en)
      .format(format),
  };

  return variants?.[calendar];
};

export default ChangeMoment;
