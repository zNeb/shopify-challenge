import { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import styles from './DateRange.module.css';

export default function DateRange() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const onSelect = (ranges: Date) => {
    console.log(ranges);
  };
  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  };

  return (
    <div className={styles.dateRange}>
      <button className={styles.button} type="button" onClick={() => { setShowDatePicker(!showDatePicker); }}>Select Date</button>
      {showDatePicker && (
        <DateRangePicker
          className={styles.datePicker}
          ranges={[selectionRange]}
          onChange={onSelect}
        />
      )}
    </div>
  );
}
