import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { TextField, MenuItem } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { TIMEZONES } from "../../../constants";
import { updateEndDuration, updateVoteStart } from "../../../store";

export const DateTimePickerWithTimezone = ({
  isStart,
  currentDate,
  currentTime,
  currentTz,
}: {
  isStart: boolean;
  currentDate: Dayjs | null;
  currentTime: Dayjs | null;
  currentTz: string;
}) => {
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [time, setTime] = useState<Dayjs | null>(dayjs());
  const [timezone, setTimezone] = useState(currentTz);

  useEffect(() => {
    if (date && time) {
      const payload = {
        date,
        time,
        timezone,
        optionSelected: true,
      };

      if (isStart) {
        updateVoteStart(payload);
      } else {
        updateEndDuration({
          ...payload,
          duration: { days: "0", hours: "0", minutes: "0" },
        });
      }
    }
  }, [date, time, timezone, isStart]);

  useEffect(() => {
    setDate(currentDate);
    setTime(currentTime);
    setTimezone(currentTz);
  }, []);

  return (
    <RowContainer>
      <DatePicker
        label="Date"
        value={date}
        onChange={(newDate) => setDate(newDate)}
        sx={{
          flex: 1,
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          border: "1px solid #e6e6ff",
          borderRadius: "8px",
          margin: 0,
        }}
      />

      <TimePicker
        label="Time"
        value={time}
        onChange={(newTime) => setTime(newTime)}
        ampm
        sx={{
          flex: 1,
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          border: "1px solid #e6e6ff",
          borderRadius: "8px",
          margin: 0,
        }}
      />

      <TextField
        select
        label="Your Timezone"
        value={timezone}
        onChange={(e) => setTimezone(e.target.value)}
        sx={{
          flex: 1,
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          border: "1px solid #e6e6ff",
          borderRadius: "8px",
          width: "50px",
          boxSizing: "border-box",
        }}
      >
        {TIMEZONES.map((tz) => (
          <MenuItem key={tz} value={tz}>
            {tz}
          </MenuItem>
        ))}
      </TextField>
    </RowContainer>
  );
};

export const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  gap: 12px;
  background: none;

  input[type="text"] {
    border: none;
    margin: 0;
    background: none;

    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.03em;
    color: rgba(41, 41, 51, 0.9);
  }

  .css-w76bbz-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input {
    padding: 16px;
  }

  .css-w76bbz-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.03em;
    color: rgba(41, 41, 51, 0.9);
  }

  .css-w76bbz-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input {
    padding: 15px 16px;
  }

  .css-105u17d-MuiFormLabel-root-MuiInputLabel-root {
    left: -14px;
    top: -10px;

    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    line-height: 15px;
    letter-spacing: -0.03em;
    color: rgba(41, 41, 51, 0.9);
  }
`;
