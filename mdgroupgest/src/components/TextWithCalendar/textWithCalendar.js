import React, { useState } from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

import { ErrorText, Body } from '../Text/text';
import { InputContainer } from './styles';

const TextWithCalendar = ({label, error, onChange, type}) => {
  var today = Date.now()
  const [selectedDate, setSelectedDate] = useState(today);
  const [inputType, setInputType] = useState(type || "date-field");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <InputContainer error={error}>
    {label && <Body>{label}</Body>}

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          DateTimeFormat={ Intl.DateTimeFormat }
          locale='pt-BR'
          margin="normal"
          id="date-picker-dialog"
          format="MM/dd/yyyy"
          value={selectedDate}
          type={inputType}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>

    {error && <ErrorText>{error}</ErrorText>}
    </InputContainer>

  );
}

export default TextWithCalendar;
