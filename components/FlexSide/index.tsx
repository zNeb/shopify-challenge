import type { ReactNode } from 'react';
import styles from './FlexSide.module.css';

interface Props {
  children: ReactNode;
}

export default function FlexSide({ children }: Props) {
  return <div className={styles.flexSide}>{children}</div>;
}
