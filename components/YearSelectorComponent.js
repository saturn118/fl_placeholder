import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



export default function YearSelectorComponent({
  yearList = [],
  currentYear = null,
  subUrl = "",
  subUrlPostFix = "",
  onChanged = null,
  placeholder = "Select year",
  dateFormat = "yyyy"
}) {
  const [startDate, setStartDate] = useState(null);

  useEffect(() => {
    if (currentYear) {
      setStartDate(new Date(currentYear, 1, 1));
    }
  }, []);

  let router = useRouter();

  return (
    <div>
      <DatePicker
        placeholderText={placeholder}
        selected={startDate}
        onChange={date => {
          onChanged(date);
          //router.push(subUrl + date.getFullYear().toString() + subUrlPostFix);
          console.log(date);
          setStartDate(date);
        }}
        showYearPicker
        dateFormat={dateFormat}
        // withPortal
      />
    </div>
  );
}
