import {useEffect, useRef} from "react";
import styles from "../styles/LetterInput.module.css";

interface LetterInputFieldProps {
  letter: string;
  focused: boolean;
  setFocus: (i: number, j: number) => void;
  setLetter: (letter: string) => void;
  index: [number, number];
  type: "word-hunt" | "anagram";
  onSubmit: () => void;
  color?: string;
  disabled?: boolean;
}

const LetterInputField: React.FC<LetterInputFieldProps> = ({
  letter,
  focused,
  setFocus,
  setLetter,
  index,
  type,
  onSubmit,
  color,
  disabled,
}) => {
  const letterRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    // check if alpha character was entered
    if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
      setLetter(e.key.toUpperCase());
      
      // For Word Hunt
      if (type === "word-hunt") {
        if (index[0] === 3) {
          // If at the end of a row, move to the first position of the next row
          setFocus(0, index[1] + 1);
        } else {
          // Otherwise move to the right
          setFocus(index[0] + 1, index[1]);
        }
      } else {
        // For Anagrams, move to the next index (increment i)
        setFocus(index[0], index[1] + 1);
      }
    } else if (e.key === "Delete") {
      setLetter("");
    } else if (e.key === "Backspace") {
      setLetter("");
      if (type === "word-hunt") {
        if (index[0] === 0 && index[1] > 0) {
          // If at the start of a row (not first row), move to the end of the previous row
          setFocus(3, index[1] - 1);
        } else {
          // Otherwise move left
          setFocus(index[0] - 1, index[1]);
        }
      } else {
        setFocus(index[0], index[1] - 1);
      }
    } else if (e.key === "ArrowLeft") {
      if (type === "word-hunt") {
        if (index[0] === 0 && index[1] > 0) {
          // If at the start of a row (not first row), move to the end of the previous row
          setFocus(3, index[1] - 1);
        } else {
          // Otherwise move left
          setFocus(index[0] - 1, index[1]);
        }
      } else {
        setFocus(index[0], index[1] - 1);
      }
    } else if (e.key === "ArrowRight") {
      if (type === "word-hunt") {
        if (index[0] === 3 && index[1] < 3) {
          // If at the end of a row (not last row), move to the start of the next row
          setFocus(0, index[1] + 1);
        } else {
          // Otherwise move right
          setFocus(index[0] + 1, index[1]);
        }
      } else {
        setFocus(index[0], index[1] + 1);
      }
    } else if (e.key === "ArrowUp") {
      if (type === "word-hunt") {
        setFocus(index[0], index[1] - 1);
      } else {
        setFocus(index[0] - 1, index[1]);
      }
    } else if (e.key === "ArrowDown") {
      if (type === "word-hunt") {
        setFocus(index[0], index[1] + 1);
      } else {
        setFocus(index[0] + 1, index[1]);
      }
    } else if (e.key === "Tab") {
      if (type === "word-hunt") {
        setFocus(index[0] + 1, index[1]);
      } else {
        setFocus(index[0], index[1] + 1);
      }
    } else if (e.key === "Enter") {
      onSubmit();
    }
  };

  useEffect(() => {
    if (focused) {
      letterRef.current?.focus();
    }
  });

  return (
    <input
      style={{
        backgroundColor: color ? color : disabled ? "#ccc" : undefined,
        borderColor: color ? color : disabled ? "#ccc" : undefined,
        color: color ? "#fff" : undefined,
      }}
      disabled={disabled}
      ref={letterRef}
      defaultValue={letter}
      maxLength={1}
      onKeyDown={handleKeyDown}
      onPaste={undefined}
      onDrop={undefined}
      className={`${styles.letter} ${
        type === "word-hunt" ? styles.hunt : styles.anagrams
      }`}
      type="text"
    />
  );
};

export default LetterInputField;
