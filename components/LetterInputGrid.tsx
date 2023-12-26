import {useState} from "react";
import {Grid} from "../pages/word-hunt";
import styles from "../styles/LetterInputGrid.module.css";
import LetterInputField from "./LetterInputField";

interface LetterInputGridProps {
  onSubmit: (letters: Grid) => void;
}

const LetterInputGrid: React.FC<LetterInputGridProps> = ({onSubmit}) => {
  const [letters, setLetters] = useState<Grid>(
    Array(4)
      .fill([])
      .map(() => Array(4).fill(""))
  );
  const [focused, setFocused] = useState<number>(0);

  const handleSubmit = () => {
    if (letters.every((row) => row.every((letter) => letter !== ""))) {
      onSubmit(letters);
    }
  };

  return (
    <div>
      <div className={styles.letters}>
        {letters.map((row, j) => (
          <div key={j} className={styles.row}>
            {row.map((letter, i) => (
              <>
                <LetterInputField
                  type="word-hunt"
                  key={i * 4 + j}
                  letter={letter}
                  focused={focused === i * 4 + j}
                  setFocus={(i, j) => {
                    if (
                      i * 4 + j >= 0 &&
                      i * 4 + j < letters.length * letters.length
                    ) {
                      setFocused(i * 4 + j);
                    }
                  }}
                  setLetter={(letter) => {
                    const newLetters = [...letters];
                    newLetters[j][i] = letter;
                    setLetters(newLetters);
                  }}
                  index={[i, j]}
                  onSubmit={handleSubmit}
                />
                <div
                  className={styles.divider}
                  style={{display: i !== 3 ? "block" : "none"}}
                />
              </>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LetterInputGrid;
