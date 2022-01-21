import { ReactNode, useState } from 'react';
import { FaPlayCircle } from 'react-icons/fa';
import styles from './Play.module.css';

interface Props {
  children: ReactNode;
}

export default function Play({ children }: Props) {
  const [playVideo, setPlayVideo] = useState(false);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {playVideo ? children : (
        <button
          className={styles.videoButton}
          onClick={() => setPlayVideo(true)}
          type="button"
        >
          <FaPlayCircle />
          Play Youtube video
        </button>
      )}
    </>
  );
}
