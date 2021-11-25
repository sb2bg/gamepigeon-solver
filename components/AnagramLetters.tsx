import { useState } from "react";
import styles from "../styles/AnagramLetters.module.css";

interface AnagramLettersProps {
  letters: string[];
}

const AnagramLetters: React.FC<AnagramLettersProps> = ({ letters }) => {
  return (
    <div>
      <div className={styles.letters}>
        {letters.map((letter, index) => {
          return (
            <div key={index} className={styles.letter}>
              {letter}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnagramLetters;
