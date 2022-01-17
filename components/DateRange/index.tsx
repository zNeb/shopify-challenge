import getDate from 'lib/getDate';
import dynamic from 'next/dynamic';
import {
  Dispatch, memo, SetStateAction, useState,
} from 'react';
import type { RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import styles from './DateRange.module.css';
import useClose from './useClose';

function DateRange({ setRange }: Props) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const ref = useClose(showDatePicker, setShowDatePicker);

  // Make the rany 100 days ago to today to limit dom size
  const { startDate: minDate, endDate: maxDate } = getDate(100);

  const { startDate, endDate } = getDate(20);

  const selectionRange = {
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    key: 'selection',
  };

  const onSelect = (ranges: RangeKeyDict) => {
    const { startDate: newStartDate, endDate: newEndDate } = ranges.selection;
    if (newStartDate && newEndDate) {
      selectionRange.startDate = new Date(newStartDate);
      selectionRange.endDate = new Date(newEndDate);

      setRange({ startDate: newStartDate, endDate: newEndDate });
    }
  };

  // Import Date range dynamically so it's only requested when needed (Similar to React.lazy)
  const dateRangePickerImport = () => import('react-date-range').then((mod) => mod.DateRangePicker);
  const DateRangePicker = dynamic(dateRangePickerImport);

  return (
    <div className={styles.dateRange} ref={ref}>
      <button
        className={styles.button}
        type="button"
        onClick={() => { setShowDatePicker(!showDatePicker); }}
      >
        Select Range
      </button>
      {showDatePicker && (
        <DateRangePicker
          className={styles.datePicker}
          ranges={[selectionRange]}
          onChange={onSelect}
          minDate={new Date(minDate)}
          maxDate={new Date(maxDate)}
          staticRanges={[]}
        />
      )}
    </div>
  );
}

interface Props {
  setRange: Dispatch<SetStateAction<any>>;
}

export default memo(DateRange);
