import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Index.module.css";
import LetterInputGrid from "../components/LetterInputGrid";
import WordGrid from "../components/WordGrid";
import { solveWordHunt } from "../util/solver";
import Link from "next/link";

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
  const [wordCount, setWordCount] = useState<number>(0);

  const handleSubmit = (words: Grid) => {
    setLoading(true);

    solveWordHunt(words).then((solved) => {
      setWords(solved);
      setWordCount(solved.size);
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
    setWordCount(0);
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
        <meta
          name="description"
          content="Find all possible words in Word Hunt with our solver."
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <i className="fas fa-search" style={{ fontSize: "0.8em", marginRight: "15px" }}></i>
          Word Hunt Solver
        </h1>
        
        <p className={styles.description}>
          Enter the letters from your Word Hunt grid below
        </p>
        
        <LetterInputGrid
          clear={clear}
          setClear={setClear}
          onSubmit={handleSubmit}
          colors={colors}
          disabled={!editing}
        />
        
        <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
          <button className={styles.actionButton} onClick={handleReset}>
            <i className="fas fa-redo-alt" style={{ marginRight: "8px" }}></i> Reset
          </button>
          
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
