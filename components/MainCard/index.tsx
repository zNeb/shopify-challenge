import Image from 'next/image';
import styles from './MainCard.module.css';

export default function MainCard({
  date, explanation, media_type, title, hdurl, url,
}: Props) {
  const highestQualityUrl = hdurl ?? url;

  return (
    <div className={styles.card}>
      {/* Only render image if it's availible */}
      {media_type === 'image' && (
      <div className={styles.image}>
        {/* Use fill layout as image size is inconsistent */}
        <Image src={highestQualityUrl} layout="fill" objectFit="cover" />
      </div>
      )}
      {/* If APOD is a youtube video include an embed */}
      {media_type === 'video' && (
        <iframe
          width="100%"
          height="300"
          src={url}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) }
      <div className={styles.content}>
        <span className={styles.title}>
          {title}
        </span>
        <span className={styles.explanation}>
          {explanation}
        </span>
        {date}
      </div>
    </div>
  );
}

interface Props {
  date: string;
  explanation: string;
  media_type: 'image' | 'video';
  title: string;
  hdurl?: string;
  url: string;
}
