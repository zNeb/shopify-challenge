import { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import styles from './Vote.module.css';

export default function Vote({ date }: Props) {
  const localStorage = typeof window !== 'undefined' && window?.localStorage;

  const [voted, setVoted] = useState(false);

  useEffect(() => {
    if (localStorage) {
      const didVote = localStorage.getItem(date);
      if (didVote === 'true') {
        setVoted(true);
      }
    }
  }, []);

  const vote = async () => {
    const newVoteValue = !voted;
    if (localStorage) {
      if (newVoteValue) {
        localStorage.setItem(date, newVoteValue.toString());
      } else {
        localStorage.removeItem(date);
      }
    }
    setVoted(newVoteValue);
  };

  return (
    <button
      className={`${styles.votes} ${voted ? styles.voted : ''}`}
      onClick={vote}
      type="button"
    >
      <FaHeart />
    </button>
  );
}

interface Props {
  date: string;
}
