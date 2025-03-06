import Head from "next/head";
import React, { useState } from "react";
import AnagramLetters from "../components/AnagramLetters";
import WordGrid from "../components/WordGrid";
import styles from "../styles/Index.module.css";
import { solveAnagrams } from "../util/solver";
import Link from "next/link";

const Anagrams: React.FC = () => {
  const [words, setWords] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastQuery, setLastQuery] = useState("");
  const [wordCount, setWordCount] = useState<number>(0);

  const handleSubmit = (joined: string) => {
    if (joined.length < 6 || !joined.match(/[a-z]/i)) {
      return;
    }

    if (joined === lastQuery) {
      return;
    }

    setLoading(true);

    solveAnagrams(joined).then((solved) => {
      const sortedWords = solved.sort((a: string, b: string) => b.length - a.length);
      setWords(sortedWords);
      setWordCount(sortedWords.length);
      setLoading(false);
    });

    setLastQuery(joined);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Anagrams Solver</title>
        <meta 
          name="description" 
          content="Find all possible words from your Anagrams letters with our solver."
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <i className="fas fa-font" style={{ fontSize: "0.8em", marginRight: "15px" }}></i>
          Anagrams Solver
        </h1>
        
        <p className={styles.description}>
          Enter your six letters below to find all possible words
        </p>
        
        <AnagramLetters
          onSubmit={(letters: string[]) => {
            handleSubmit(letters.join(""));
          }}
        />
        
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link href="/">
            <a className={styles.actionButton}>
              <i className="fas fa-home" style={{ marginRight: "8px" }}></i> Home
            </a>
          </Link>
        </div>

        {wordCount > 0 && (
          <div className={styles.subtitle}>
            <i className="fas fa-book" style={{ marginRight: "10px" }}></i>
            {wordCount} Word Combinations
          </div>
        )}
        
        <WordGrid words={words} loading={loading} />
      </main>
    </div>
  );
};

export default Anagrams;
