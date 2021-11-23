import { useState } from "react";
import styles from "../styles/AnagramLetters.module.css";

const AnagramLetters = () => {
  const [letters, setLetters] = useState<string[]>(
    new Array<string>(6).fill(" ")
  );

  return (
    <div className={styles.letters}>
      {letters.map((letter, index) => {
        return (
          <div key={index} className={styles.letter}>
            {letter}
          </div>
        );
      })}
    </div>
  );
};

export default AnagramLetters;
