import Play from 'components/Play';
import Vote from 'components/Vote';
import Image from 'next/image';
import styles from './Showcase.module.css';

export default function Showcase({
  url, hdurl, media_type, copyright, date, title,
}: Props) {
  return (
    <div className={styles.card}>
      {/* Only render image if it's availible */}
      {media_type === 'image' && (
      <div className={styles.image}>
        {/* Use fill layout as image size is inconsistent */}
        <Image
          src={hdurl || url}
          layout="fill"
          objectFit="cover"
          alt={`${title} Image`}
        />
        <Vote date={date} />
        {copyright && (
        <span className={styles.copyright}>
          ©
          {' '}
          {copyright}
        </span>
        )}
      </div>
      )}
      {/* If APOD is a youtube video include an embed */}
      {media_type === 'video' && (
        <div className={styles.image}>
          <Play>
            <iframe
              width="100%"
              height="800"
              src={url}
              title={`${title} Video`}
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
            />
            <Vote date={date} />
          </Play>
        </div>
      )}
    </div>
  );
}

interface Props {
  media_type: 'image' | 'video';
  url: string;
  hdurl?: string;
  copyright?: string;
  date: string;
  title: string;
}
