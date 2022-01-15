import type { ReactNode, CSSProperties } from 'react';
import styles from './Row.module.css';

interface RowProps {
  children: ReactNode;
  itemWidth?: number | string;
  columns?: number | string;
  gap?: number | string;
  breakItem?: number | string;
}

export default function Row({
  children,
  itemWidth,
  columns,
  gap,
  breakItem,
}: RowProps) {
  return (
    <div
      className={`${styles.row} ${columns ? styles.columns : ''}  ${
        breakItem ? styles[breakItem] : ''
      }`}
      style={
        {
          '--width': `${itemWidth || '250'}px`,
          '--columns': columns || '0',
          '--gap': `${gap || '20'}px`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

interface ItemProps {
  className?: string;
  children: ReactNode;
  span?: string;
  center?: string;
}

function Item({
  className, children, span, center,
}: ItemProps) {
  return (
    <div
      className={`${styles.item} ${center ? styles[center] : ''} ${className || ''}`}
      style={{ '--span': span || '1' } as CSSProperties}
    >
      {children}
    </div>
  );
}

Row.Item = Item;
