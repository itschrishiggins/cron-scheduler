import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

const days = Array.from({ length: 31 }, (_, i) => i + 1);

export default function DayOfMonthSelector({ selected, onChange }) {
  return (
    <FormControl fullWidth margin="normal" variant="outlined">
      <InputLabel id="day-of-month-label">Days of Month</InputLabel>
      <Select
        labelId="day-of-month-label"
        multiple
        value={selected}
        onChange={e => onChange(e.target.value)}
        label="Days of Month"
        renderValue={vals => vals.join(', ')}
      >
        {days.map(day => (
          <MenuItem key={day} value={day}>
            <Checkbox checked={selected.includes(day)} />
            <ListItemText primary={day} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
