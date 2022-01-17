import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import type { RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import styles from './DateRange.module.css';
import useClose from './useClose';

export default function DateRange() {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const ref = useClose(showDatePicker, setShowDatePicker);

  const onSelect = (ranges: RangeKeyDict) => {
    console.log(ranges);
  };

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  };

  // Import Date range dynamically so it's only requested when needed (Same as React.lazy)
  const dateRangePickerImport = () => import('react-date-range').then((mod) => mod.DateRangePicker);
  const DateRangePicker = dynamic(dateRangePickerImport);

  return (
    <div className={styles.dateRange} ref={ref}>
      <button
        className={styles.button}
        type="button"
        onClick={() => { setShowDatePicker(!showDatePicker); }}
      >
        Select Date
      </button>
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
