import Play from 'components/Play';
import Vote from 'components/Vote';
import Image from 'next/image';
import Link from 'next/link';
import { FaCaretRight } from 'react-icons/fa';
import cardStyles from './Card.module.css';
import mainStyles from './MainCard.module.css';

export default function Card({
  date, explanation, media_type, title, url, hdurl, copyright, main,
}: Props) {
  const styles = main ? mainStyles : cardStyles;

  return (
    <div className={styles.card}>
      {/* Only render image if it's availible */}
      {media_type === 'image' && (
      <div className={styles.image}>
        {/* Use fill layout as image size is inconsistent */}
        <Image
          src={(main && hdurl) ? hdurl : url}
          layout="fill"
          objectFit="cover"
          alt={`${title} Image`}
        />
        {copyright && (
        <span className={styles.copyright}>
          ©
          {' '}
          {copyright}
        </span>
        )}
        <Vote date={date} />
      </div>
      )}
      {/* If APOD is a youtube video include an embed */}
      {media_type === 'video' && (
      <div className={styles.image}>
        <Play>
          <iframe
            width="100%"
            height="300"
            src={url}
            title={`${title} Video`}
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
          />
          <Vote date={date} />
        </Play>
      </div>
      ) }
      <div className={styles.content}>
        <span title={title} className={styles.title}>
          {title}
        </span>
        <span className={styles.explanation}>
          {explanation}
        </span>
        <span className={styles.date}>
          {date}
        </span>
      </div>
      <Link href={`/day/${date}`}>
        <a className={styles.info}>
          More Details
          {' '}
          <FaCaretRight />
        </a>
      </Link>
    </div>
  );
}

interface Props {
  date: string;
  explanation: string;
  media_type: 'image' | 'video';
  title: string;
  url: string;
  hdurl?: string;
  copyright?: string;
  main?: boolean;
}

export interface NasaJson {
  date: string;
  explanation: string;
  hdurl: string;
  media_type: 'image' | 'video';
  service_version: 'v1';
  title: string;
  url: string;
  copyright?: string;
}
