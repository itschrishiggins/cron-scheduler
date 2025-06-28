import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

export default function IntervalPicker({ value, onChange }) {
  const handleChange = (e) => {
    const n = parseInt(e.target.value, 10) || 0;
    onChange(n);
  };

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor="interval-picker">Every</InputLabel>
      <OutlinedInput
        id="interval-picker"
        type="number"
        value={value}
        onChange={handleChange}
        endAdornment={<InputAdornment position="end">minutes</InputAdornment>}
        label="Every"
      />
    </FormControl>
  );
}
