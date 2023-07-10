import React, { useState } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';

const fiveAM = dayjs().set('hour', 5).startOf('hour');
const nineAM = dayjs().set('hour', 9).startOf('hour');

export const DatePickerfunc = ({ label , onDateChange}) => {
  const [selectedDateTime, setSelectedDateTime] = React.useState(null);

  const handleDateTimeChange = (dateTime) => {
      setSelectedDateTime(dateTime['$d']);
      onDateChange(dateTime['$d'])
  };

  const handleOkClick = () => {
    console.log(selectedDateTime);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker', 'DateTimePicker']}>
        <DemoItem label={label}>
          <DateTimePicker
            defaultValue={nineAM}
            onChange={handleDateTimeChange}
            onAccept={handleOkClick}
                      renderInput={(props) => <TimePicker {...props}
                          disablePast
                      disableFuture/>}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
};
