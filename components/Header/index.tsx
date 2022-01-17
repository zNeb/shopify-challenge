import Link from 'next/link';
import type { ReactNode } from 'react';
import styles from './Header.module.css';

interface Props {
  href: string;
  children: ReactNode;
}

function Item({ href, children }: Props) {
  return (
    <li className={styles.item}>
      <Link href={href}>
        <a>{children}</a>
      </Link>
    </li>
  );
}

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/">
          <a className={styles.logo}>
            NASA APOD
          </a>
        </Link>
        <ul className={styles.items}>
          <Item href="/">Home</Item>
        </ul>
      </nav>
    </header>
  );
}
