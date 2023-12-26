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
}) => {
  const letterRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    // check if alpha character was entered
    if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
      setLetter(e.key.toUpperCase());
      setFocus(index[0], index[1] + 1);
    } else if (e.key === "Delete") {
      setLetter("");
    } else if (e.key === "Backspace") {
      setLetter("");
      setFocus(index[0], index[1] - 1);
    } else if (e.key === "ArrowLeft") {
      setFocus(index[0], index[1] - 1);
    } else if (e.key === "ArrowRight") {
      setFocus(index[0], index[1] + 1);
    } else if (e.key === "ArrowUp") {
      setFocus(index[0] - 1, index[1]);
    } else if (e.key === "ArrowDown") {
      setFocus(index[0] + 1, index[1]);
    } else if (e.key === "Tab") {
      setFocus(index[0], index[1] + 1);
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
      style={{backgroundColor: color}}
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
