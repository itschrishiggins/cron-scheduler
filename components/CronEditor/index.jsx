import { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import DailyPanel from "./DailyPanel";
import WeeklyPanel from "./WeeklyPanel";
import MonthlyPanel from "./MonthlyPanel";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import UploadIcon from "@mui/icons-material/Upload";
import SaveIcon from "@mui/icons-material/Save";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";

const frequencyOptions = ["Daily", "Weekly", "Monthly", "Custom"];

export default function CronEditor() {
  const [frequency, setFrequency] = useState("Daily");
  const [loaded, setLoaded] = useState("");
  const [unsupported, setUnsupported] = useState(false);

  const [dailyState, setDailyState] = useState({
    mode: "interval",
    interval: 15,
    times: ["09:00"],
  });
  const [weeklyState, setWeeklyState] = useState({
    daysOfWeek: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    mode: "times",
    interval: 15,
    times: ["09:00"],
  });
  const [monthlyState, setMonthlyState] = useState({
    daysOfMonth: [1],
    mode: "times",
    interval: 15,
    times: ["09:00"],
  });

  const [customExpression, setCustomExpression] = useState("");

  // clear custom expression/error message when switching panels
  useEffect(() => {
    setCustomExpression("");
    setUnsupported(false);
  }, [frequency]);

  const handleSave = () => {
    setUnsupported(false);
    let expr = "";

    switch (frequency) {
      case "Daily":
        if (dailyState.mode === "interval") {
          expr = `*/${dailyState.interval} * * * *`;
        } else {
          const mins = dailyState.times.map((t) => t.split(":")[1]).join(",");
          const hrs = dailyState.times.map((t) => t.split(":")[0]).join(",");
          expr = `${mins} ${hrs} * * *`;
        }
        break;

      case "Weekly":
        if (weeklyState.mode === "interval") {
          const days = weeklyState.daysOfWeek
            .map((d) => d.slice(0, 3).toUpperCase())
            .join(",");
          expr = `*/${weeklyState.interval} * * * ${days}`;
        } else {
          const mins = weeklyState.times.map((t) => t.split(":")[1]).join(",");
          const hrs = weeklyState.times.map((t) => t.split(":")[0]).join(",");
          const days = weeklyState.daysOfWeek
            .map((d) => d.slice(0, 3).toUpperCase())
            .join(",");
          expr = `${mins} ${hrs} * * ${days}`;
        }
        break;

      case "Monthly":
        if (monthlyState.mode === "interval") {
          const doms = monthlyState.daysOfMonth.join(",");
          expr = `*/${monthlyState.interval} * ${doms} * *`;
        } else {
          const mins = monthlyState.times.map((t) => t.split(":")[1]).join(",");
          const hrs = monthlyState.times.map((t) => t.split(":")[0]).join(",");
          const doms = monthlyState.daysOfMonth.join(",");
          expr = `${mins} ${hrs} ${doms} * *`;
        }
        break;

      case "Custom":
        expr = customExpression;
        break;

      default:
        expr = "";
    }

    setLoaded(expr.trim());
  };

  const handleLoad = () => {
    setUnsupported(false);
    const expr = (frequency === "Custom" ? customExpression : loaded).trim();
    let m;

    // DAILY interval
    m =
      expr.match(/^ \*\/(\d+) \* \* \* \*$/) ||
      expr.match(/^(\*\/\d+) \* \* \* \*$/);
    if (m) {
      const interval = m[1].includes("/")
        ? parseInt(m[1].split("/")[1], 10)
        : parseInt(m[1], 10);
      setFrequency("Daily");
      setDailyState({ mode: "interval", interval, times: ["09:00"] });
      return;
    }

    // DAILY specific times
    m = expr.match(/^([0-9,]+) ([0-9,]+) \* \* \*$/);
    if (m) {
      const mins = m[1].split(",");
      const hrs = m[2].split(",");
      const times = mins.map(
        (mi, i) => `${hrs[i].padStart(2, "0")}:${mi.padStart(2, "0")}`
      );
      setFrequency("Daily");
      setDailyState({ mode: "times", interval: 15, times });
      return;
    }

    // WEEKLY interval
    m =
      expr.match(/^ \*\/(\d+) \* \* \* ([A-Z]{3}(?:,[A-Z]{3})*)$/) ||
      expr.match(/^(\*\/\d+) \* \* \* ([A-Z]{3}(?:,[A-Z]{3})*)$/);
    if (m) {
      const interval = m[1].includes("/")
        ? parseInt(m[1].split("/")[1], 10)
        : parseInt(m[1], 10);
      const days = m[2]
        .split(",")
        .map(
          (code) => code.charAt(0) + code.slice(1).toLowerCase().slice(0, 2)
        );
      setFrequency("Weekly");
      setWeeklyState({
        daysOfWeek: days,
        mode: "interval",
        interval,
        times: ["09:00"],
      });
      return;
    }

    // Weekly specific times
    m = expr.match(/^([0-9,]+) ([0-9,]+) \* \* ([A-Z]{3}(?:,[A-Z]{3})*)$/);
    if (m) {
      const mins = m[1].split(",");
      const hrs = m[2].split(",");
      const times = mins.map(
        (mi, i) => `${hrs[i].padStart(2, "0")}:${mi.padStart(2, "0")}`
      );
      const days = m[3]
        .split(",")
        .map(
          (code) => code.charAt(0) + code.slice(1).toLowerCase().slice(0, 2)
        );
      setFrequency("Weekly");
      setWeeklyState({ daysOfWeek: days, mode: "times", interval: 15, times });
      return;
    }

    // MONTHLY interval
    m =
      expr.match(/^ \*\/(\d+) \* ([1-9][0-9]*(?:,[1-9][0-9]*)*) \* \*$/) ||
      expr.match(/^(\*\/\d+) \* ([1-9][0-9]*(?:,[1-9][0-9]*)*) \* \*$/);
    if (m) {
      const interval = m[1].includes("/")
        ? parseInt(m[1].split("/")[1], 10)
        : parseInt(m[1], 10);
      const daysOfMonth = m[2].split(",").map((n) => parseInt(n, 10));
      setFrequency("Monthly");
      setMonthlyState({
        daysOfMonth,
        mode: "interval",
        interval,
        times: ["09:00"],
      });
      return;
    }

    // MONTHLY specific times
    m = expr.match(
      /^([0-9,]+) ([0-9,]+) ([1-9][0-9]*(?:,[1-9][0-9]*)*) \* \*$/
    );
    if (m) {
      const mins = m[1].split(",");
      const hrs = m[2].split(",");
      const doms = m[3].split(",").map((n) => parseInt(n, 10));
      const times = mins.map(
        (mi, i) => `${hrs[i].padStart(2, "0")}:${mi.padStart(2, "0")}`
      );
      setFrequency("Monthly");
      setMonthlyState({
        daysOfMonth: doms,
        mode: "times",
        interval: 15,
        times,
      });
      return;
    }

    // fallback for unsupported expressions
    setFrequency("Custom");
    setCustomExpression(expr);
    setUnsupported(true);
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 4,
        m: 4,
        maxWidth: 600,
        mx: "auto",
        borderColor: "background.border",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "primary.dark", mb: 3, pb: 1 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, color: "primary.main" }}
        >
          Task Scheduler
        </Typography>
      </Box>

      <Box mb={3}>
        <RadioGroup
          row
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        >
          {frequencyOptions.map((opt) => (
            <FormControlLabel
              key={opt}
              value={opt}
              control={<Radio color="primary" />}
              label={opt}
            />
          ))}
        </RadioGroup>
      </Box>

      <Box mb={5}>
        {frequency === "Daily" && (
          <DailyPanel state={dailyState} onChange={setDailyState} />
        )}
        {frequency === "Weekly" && (
          <WeeklyPanel state={weeklyState} onChange={setWeeklyState} />
        )}
        {frequency === "Monthly" && (
          <MonthlyPanel state={monthlyState} onChange={setMonthlyState} />
        )}
      </Box>

      {unsupported && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          Expression invalid or not supported.
        </Alert>
      )}

      <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
        {frequency === "Custom" && (
          <InputLabel htmlFor="cron-expression">
            Enter CRON Expression
          </InputLabel>
        )}
        <OutlinedInput
          id="cron-expression"
          value={frequency === "Custom" ? customExpression : loaded}
          onChange={
            frequency === "Custom"
              ? (e) => setCustomExpression(e.target.value)
              : undefined
          }
          disabled={frequency !== "Custom"}
          label={frequency === "Custom" ? "Enter CRON Expression" : undefined}
        />
      </FormControl>

      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button
          onClick={handleLoad}
          variant="contained"
          color="primary"
          startIcon={<UploadIcon />}
        >
          Load
        </Button>
        <Button
          onClick={handleSave}
          variant="outlined"
          color="primary"
          startIcon={<SaveIcon />}
        >
          Save
        </Button>
      </Stack>
    </Paper>
  );
}
