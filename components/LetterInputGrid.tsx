import {useEffect, useState} from "react";
import {Grid} from "../pages/word-hunt";
import styles from "../styles/LetterInputGrid.module.css";
import LetterInputField from "./LetterInputField";
import React from "react";

interface LetterInputGridProps {
  onSubmit: (letters: Grid) => void;
  colors: Map<string, string>;
  disabled?: boolean;
  clear: boolean;
  setClear: (clear: boolean) => void;
}

const LetterInputGrid: React.FC<LetterInputGridProps> = ({
  onSubmit,
  colors,
  disabled,
  clear,
  setClear,
}) => {
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

  useEffect(() => {
    if (clear) {
      setLetters(
        Array(4)
          .fill([])
          .map(() => Array(4).fill(""))
      );

      setFocused(0);
      setClear(false);
    }
  }, [clear, setClear]);

  return (
    <div className={styles.letters}>
      {letters.map((row, i) => (
        <div key={i} className={styles.row}>
          {row.map((letter, j) => {
            const color = colors.get(`${i},${j}`);

            return (
              <React.Fragment key={j * 4 + i}>
                <LetterInputField
                  disabled={disabled}
                  color={color}
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
              </React.Fragment>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default LetterInputGrid;
