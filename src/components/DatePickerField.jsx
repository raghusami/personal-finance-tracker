import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePickerField({ label, name, setValue, errors, defaultValue }) {
  const [selectedDate, setSelectedDate] = useState(defaultValue ? new Date(defaultValue) : null);

  // 🔁 Update when defaultValue changes (e.g. during edit mode)
useEffect(() => {
  if (defaultValue) {
    const parsedDate = new Date(defaultValue);
    setSelectedDate(parsedDate);
    setValue(name, parsedDate);
  }
}, [defaultValue, name, setValue]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setValue(name, date);
  };

  return (
    <div>
      {label && <label className="label font-semibold text-base-content">{label}</label>}
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        className="input input-bordered w-full"
        popperPlacement="bottom-start"
        placeholderText="Select date"
      />
      {errors?.[name] && (
        <p className="text-error text-xs mt-1">{errors[name].message}</p>
      )}
    </div>
  );
}
