import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Box from "@mui/material/Box";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function DayOfWeekSelector({ selected, onChange }) {
  return (
    <Box mb={2}>
      <ToggleButtonGroup
        value={selected}
        fullWidth
        onChange={(_, newDays) => onChange(newDays)}
        aria-label="days of week"
      >
        {days.map((d) => (
          <ToggleButton key={d} value={d} aria-label={d}>
            {d}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}
