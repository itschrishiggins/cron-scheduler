import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import DayOfMonthSelector from '../controls/DayOfMonthSelector';
import TimeModePanel from './TimeModePanel';

export default function MonthlyPanel({ state, onChange }) {
  const { mode, interval, daysOfMonth, times } = state;

  const handleDaysChange = newDays => {
    onChange({ ...state, daysOfMonth: newDays });
  };

  const handleModeChange = (e) =>
    onChange({ ...state, mode: e.target.value });
  const handleIntervalChange = (mins) =>
    onChange({ ...state, interval: mins });
  const handleTimeChange = (t, i) =>
    onChange({
      ...state,
      times: state.times.map((time, idx) => (idx === i ? t : time)),
    });
  const handleToggleSecond = () =>
    onChange({
      ...state,
      times:
        times.length > 1
          ? [times[0]]
          : [...times, '12:00'],
    });

  return (
    <Card variant="outlined">
      <CardContent>
        <DayOfMonthSelector
          selected={daysOfMonth}
          onChange={handleDaysChange}
        />

        <TimeModePanel
                  mode={mode}
                  interval={interval}
                  times={times}
                  onModeChange={handleModeChange}
                  onIntervalChange={handleIntervalChange}
                  onTimeChange={handleTimeChange}
                  onToggleSecond={handleToggleSecond}
                />
      </CardContent>
    </Card>
  );
}
