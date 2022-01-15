import type { CSSProperties, ReactNode } from 'react';
import styles from './Section.module.css';

interface Props {
  children: ReactNode;
  background?: string;
}

export default function Section({ children, background }: Props) {
  return (
    <section
      className={styles.section}
      style={{ '--background': background || 'none' } as CSSProperties}
    >
      {children}
    </section>
  );
}
