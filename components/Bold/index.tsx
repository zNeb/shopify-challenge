import type { ReactNode } from 'react';
import styles from './Bold.module.css';

interface Props {
  children: ReactNode;
}

export default function Bold({ children }: Props) {
  return (
    <span className={styles.bold}>
      {children}
    </span>
  );
}
