import getDate from 'lib/getDate';
import dynamic from 'next/dynamic';
import {
  memo, useEffect, useRef, useState,
} from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import styles from './DateRange.module.css';
import useClose from './useClose';

function DateRange({ range, setRange }: Props) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const rangeRef = useRef<DateObject | null>(null);

  const ref = useClose(showDatePicker, setShowDatePicker);

  // Make the rany 100 days ago to today to limit dom size
  const { startDate: minDate, endDate: maxDate } = getDate(100);

  const { startDate, endDate } = getDate(20);

  const selectionRange = {
    startDate: range.startDate || new Date(startDate),
    endDate: range.endDate || new Date(endDate),
    key: 'selection',
  };

  const onSelect = (ranges: RangeKeyDict) => {
    const { startDate: newStartDate, endDate: newEndDate } = ranges.selection;
    if (newStartDate && newEndDate) {
      selectionRange.startDate = new Date(newStartDate);
      selectionRange.endDate = new Date(newEndDate);

      rangeRef.current = { startDate: newStartDate, endDate: newEndDate };
    }
  };

  useEffect(() => {
    if (!showDatePicker && rangeRef.current) {
      setRange(rangeRef.current);
    }
  }, [showDatePicker]);

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
        {!showDatePicker ? 'Select Range' : 'Save Range'}
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

interface DateObject {
  startDate: Date | null;
  endDate: Date | null;
}

interface Props {
  range: DateObject;
  setRange: Dispatch<SetStateAction<any>>;
}

export default memo(DateRange);
