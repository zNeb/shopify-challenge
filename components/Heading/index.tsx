import type { ReactNode } from 'react';
import styles from './Heading.module.css';

export default function Heading({
  children,
}: Props) {
  return (
    <h2 className={styles.heading}>{children}</h2>
  );
}

interface Props {
  children: ReactNode
}
