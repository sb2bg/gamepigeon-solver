import Head from "next/head";
import {useEffect, useState} from "react";
import styles from "../styles/Index.module.css";
import LetterInputGrid from "../components/LetterInputGrid";
import WordGrid from "../components/WordGrid";
import {solveWordHunt} from "../util/solver";

export type Grid = string[][];

const WordHunt = () => {
  const [words, setWords] = useState<Map<string, [number, number][]>>(
    new Map()
  );
  const [highlighted, setHighlighted] = useState<[number, number][]>([]);
  const [colors, setColors] = useState<Map<string, string>>(new Map());
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<boolean>(true);
  const [clear, setClear] = useState<boolean>(false);

  const handleSubmit = (words: Grid) => {
    setLoading(true);

    solveWordHunt(words).then((solved) => {
      setWords(solved);
      setLoading(false);
    });

    setEditing(false);
  };

  const handleReset = () => {
    setWords(new Map());
    setHighlighted([]);
    setColors(new Map());
    setEditing(true);
    setClear(true);
  };

  useEffect(() => {
    const newColors = new Map<string, string>();
    const curr = [255, 0, 0];

    highlighted.forEach((coords) => {
      newColors.set(`${coords[0]},${coords[1]}`, `rgb(${curr.join(",")})`);
      curr[1] += 30;
    });

    setColors(newColors);
  }, [highlighted]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Word Hunt Solver</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Word Hunt Solver</h1>
        <LetterInputGrid
          clear={clear}
          setClear={setClear}
          onSubmit={handleSubmit}
          colors={colors}
          disabled={!editing}
        />
        <button className={styles.reset} onClick={handleReset}>
          Reset
        </button>
        <p className={styles.subtitle}>Word Combinations</p>
        <WordGrid
          onClick={(word) => {
            setHighlighted(words.get(word) || []);
          }}
          words={Array.from(words.keys()).sort((a, b) => b.length - a.length)}
          loading={loading}
        />
      </main>
    </div>
  );
};

export default WordHunt;
