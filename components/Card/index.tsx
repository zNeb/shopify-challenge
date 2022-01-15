import Image from 'next/image';
import styles from './Card.module.css';

export default function Card({
  date, explanation, hdurl, media_type, title, url,
}: Props) {
  return (
    <div className={styles.card}>
      {/* Use fill layout as image size is inconsistent */}
      {media_type === 'image' && (
      <div className={styles.image}>
        <Image src={url} layout="fill" objectFit="cover" />
      </div>
      )}
      <span className={styles.title}>
        {title}
      </span>
      <span className={styles.explanation}>
        {explanation}
      </span>
      {date}
    </div>
  );
}

interface Props {
  date: string;
  explanation: string;
  hdurl: string;
  title: string;
  url: string;
}
