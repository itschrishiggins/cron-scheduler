import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import TimeModePanel from './TimeModePanel';

export default function DailyPanel({ state, onChange }) {
  const { mode, interval, times } = state;

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
        state.times.length > 1
          ? [state.times[0]]
          : [...state.times, '12:00'],
    });

  return (
    <Card variant="outlined">
      <CardContent>
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
