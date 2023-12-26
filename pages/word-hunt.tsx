import Head from "next/head";
import {useState} from "react";
import styles from "../styles/Index.module.css";
import LetterInputGrid from "../components/LetterInputGrid";
import WordGrid from "../components/WordGrid";
import {solveWordHunt} from "../util/solver";

export type Grid = string[][];

const WordHunt = () => {
  const [words, setWords] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastQuery, setLastQuery] = useState<Grid>(
    Array(4)
      .fill([])
      .map(() => Array(4).fill(""))
  );

  const handleSubmit = (words: Grid) => {
    if (words === lastQuery) {
      return;
    }

    setLoading(true);

    solveWordHunt(words).then((solved) => {
      setWords(solved.sort((a: string, b: string) => b.length - a.length));
      setLoading(false);
    });

    setLastQuery(words);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Word Hunt Solver</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Word Hunt Solver</h1>
        <LetterInputGrid onSubmit={handleSubmit} />
        <p className={styles.subtitle}>Word Combinations</p>
        <WordGrid words={words} loading={loading} />
      </main>
    </div>
  );
};

export default WordHunt;
