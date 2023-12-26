import {useState} from "react";
import styles from "../styles/AnagramLetters.module.css";
import LetterInputField from "./LetterInputField";
import Head from "next/head";

interface AnagramLettersProps {
  onSubmit: (letters: string[]) => void;
}

const AnagramLetters: React.FC<AnagramLettersProps> = ({onSubmit}) => {
  const [letters, setLetters] = useState<string[]>(new Array(6).fill(""));
  const [focused, setFocused] = useState<number>(0);

  const handleSubmit = () => {
    const joined = letters.join("");

    if (joined.length === 6) {
      onSubmit(letters);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Anagram Solver</title>
      </Head>

      <div>
        <div className={styles.letters}>
          {letters.map((letter, index) => {
            return (
              <div key={index}>
                <LetterInputField
                  type="anagram"
                  letter={letter}
                  focused={focused === index}
                  setFocus={(_, j) => {
                    if (j >= 0 && j < letters.length) {
                      setFocused(j);
                    }
                  }}
                  setLetter={(letter) => {
                    const newLetters = [...letters];
                    newLetters[index] = letter;
                    setLetters(newLetters);
                  }}
                  index={[0, index]}
                  onSubmit={handleSubmit}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnagramLetters;
