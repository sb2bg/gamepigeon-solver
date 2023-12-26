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
        {letters.map((row, i) => (
          <div key={i} className={styles.row}>
            {row.map((letter, j) => (
              <>
                <LetterInputField
                  type="word-hunt"
                  key={j * 4 + i}
                  letter={letter}
                  focused={focused === j * 4 + i}
                  setFocus={(j, i) => {
                    if (
                      j * 4 + i >= 0 &&
                      j * 4 + i < letters.length * letters.length
                    ) {
                      setFocused(j * 4 + i);
                    }
                  }}
                  setLetter={(letter) => {
                    const newLetters = [...letters];
                    newLetters[i][j] = letter;
                    setLetters(newLetters);
                  }}
                  index={[j, i]}
                  onSubmit={handleSubmit}
                />
                <div
                  className={styles.divider}
                  style={{display: row.length - 1 === j ? "none" : "block"}}
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
