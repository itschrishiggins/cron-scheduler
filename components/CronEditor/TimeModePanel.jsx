import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import IntervalPicker from "../controls/IntervalPicker";
import TimePicker from "../controls/TimePicker";

export default function TimeModePanel({
  mode,
  interval,
  times,
  onModeChange,
  onIntervalChange,
  onTimeChange,
  onToggleSecond,
}) {
  const hasSecond = times.length > 1;

  return (
    <>
      <RadioGroup row value={mode} onChange={onModeChange} sx={{ mb: 2 }}>
        <FormControlLabel
          value="interval"
          control={
            <Radio
              color="primary"
              sx={{
                "&.Mui-checked": {
                  color: "primary.light",
                },
              }}
            />
          }
          label="Every X minutes"
        />
        <FormControlLabel
          value="times"
          control={
            <Radio
              color="primary"
              sx={{
                "&.Mui-checked": {
                  color: "primary.light",
                },
              }}
            />
          }
          label="Specific time(s)"
        />
      </RadioGroup>

      {mode === "interval" ? (
        <IntervalPicker value={interval} onChange={onIntervalChange} />
      ) : (
        <Stack spacing={2}>
          <TimePicker
            label="At"
            value={times[0]}
            onChange={(t) => onTimeChange(t, 0)}
          />

          <Button variant="text" size="small" onClick={onToggleSecond}>
            {hasSecond ? "– Remove second time" : "+ Add another time"}
          </Button>

          {hasSecond && (
            <TimePicker
              label="Also at"
              value={times[1]}
              onChange={(t) => onTimeChange(t, 1)}
            />
          )}
        </Stack>
      )}
    </>
  );
}
