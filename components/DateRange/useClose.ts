import {
  useEffect, useRef,
} from 'react';
import type { Dispatch, SetStateAction } from 'react';

export default function useClose(show: boolean, setShow: Dispatch<SetStateAction<boolean>>) {
  // Handle the user clicking outside or clicking escape
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    // Dony Hide if clicking within or if the click wasn't the left button of the mouse
    if (ref.current) {
      if (!ref.current.contains(event.target as HTMLElement) && event.button === 0) {
        setShow(false);
      }
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (ref.current && event.key === 'Escape') {
      setShow(false);
    }
  };

  useEffect(() => {
    if (show) {
      if (ref.current) {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
      }
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [show]);

  return ref;
}
