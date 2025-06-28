import * as React from "react";
import TextField from "@mui/material/TextField";
import { TimePicker as MUITimePicker } from "@mui/x-date-pickers/TimePicker";

export default function TimePicker({ value, onChange }) {
  const [localValue, setLocalValue] = React.useState(
    value ? new Date(`1970-01-01T${value}:00`) : null
  );

  return (
    <MUITimePicker
      label="Time"
      value={localValue}
      onChange={(newVal) => {
        setLocalValue(newVal);
        if (newVal) {
          const hrs = newVal.getHours().toString().padStart(2, "0");
          const mins = newVal.getMinutes().toString().padStart(2, "0");
          onChange(`${hrs}:${mins}`);
        }
      }}
      renderInput={(params) => (
        <TextField {...params} margin="normal" fullWidth />
      )}
    />
  );
}
