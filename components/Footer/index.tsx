import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.name}>
        NASA Astronomy Picture of the day
      </span>
    </footer>
  );
}
