import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import DayOfWeekSelector from '../controls/DayOfWeekSelector';
import TimeModePanel from './TimeModePanel';

export default function WeeklyPanel({ state, onChange }) {
  const { daysOfWeek, mode, interval, times } = state;

  const handleDayChange = (newDays) =>
    onChange({ ...state, daysOfWeek: newDays });
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
        <DayOfWeekSelector
          selected={daysOfWeek}
          onChange={handleDayChange}
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
