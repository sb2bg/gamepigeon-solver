import Head from "next/head";
import React, { useState } from "react";
import AnagramLetters from "../components/AnagramLetters";
import WordGrid from "../components/WordGrid";
import styles from "../styles/Index.module.css";
import { solveAnagrams } from "../util/solver";

const WordHunt: React.FC = () => {
  const [words, setWords] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastQuery, setLastQuery] = useState("");

  const handleSubmit = (joined: string) => {
    if (joined.length < 6 || !joined.match(/[a-z]/i)) {
      return;
    }

    if (joined === lastQuery) {
      return;
    }

    setLoading(true);

    solveAnagrams(joined).then((words) => {
      setWords(words.sort((a: string, b: string) => b.length - a.length));
      setLoading(false);
    });

    setLastQuery(joined);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Anagrams Solver</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Anagrams Solver</h1>
        <AnagramLetters
          onSubmit={(letters: string[]) => {
            handleSubmit(letters.join(""));
          }}
        />
        <p className={styles.subtitle}>Word Combinations</p>
        <WordGrid words={words} loading={loading} />
      </main>
    </div>
  );
};

export default WordHunt;
