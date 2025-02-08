import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ButtonStylled from './ButtonStylled';
import TextField from './TextField';

const DatePicker = ({ value, onDateChange }) => {
  const [date, setDate] = useState(value || new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    if (onDateChange) {
      onDateChange(currentDate);
    }
  };

  return (
    <View style={{backgroundColor : '#007bff', borderRadius : 10}}>
      <ButtonStylled onPress={() => setShow(true)} style={styles.button}>
        <TextField>{date.toLocaleDateString()}</TextField>
      </ButtonStylled>
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 4,
    paddingHorizontal: 4,
    marginVertical: 5,
    backgroundColor : '#007bff'
  },
});

export default DatePicker;