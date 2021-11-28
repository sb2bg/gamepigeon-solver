import Head from "next/head";
import React, { useState } from "react";
import AnagramLetters from "../components/AnagramLetters";
import Banner from "../components/Banner";
import styles from "../styles/Index.module.css";

const WordHunt = () => {
  const [letters, setLetters] = useState(new Array(6).fill(" "));
  const [words, setWords] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastQuery, setLastQuery] = useState("");

  const handleChange = (e: any) => {
    const newLetters = [];

    for (const letter of e.target.value) {
      if (letter.match(/[a-z]/i)) {
        newLetters.push(letter.toUpperCase());
      }
    }

    for (let i = newLetters.length; i < 6; i++) {
      newLetters.push(" ");
    }

    setLetters(newLetters);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const joined = letters.join("").trim();

    if (joined.length < 6 || !joined.match(/[a-z]/i)) {
      setShow(true);

      setTimeout(() => {
        setShow(false);
      }, 3200);

      return;
    }

    if (joined === lastQuery) {
      return;
    }

    setLoading(true);

    const url =
      process.env.NODE_ENV === "production"
        ? "https://gamepigeon-solver.vercel.app"
        : "http://localhost:3000";

    fetch(`${url}/api/anagrams/${letters.join("")}`)
      .then((data) => data.json())
      .then((json) => {
        setWords([]);

        setWords(
          json.words.sort((a: string, b: string) => b.length - a.length)
        );

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
        <AnagramLetters letters={letters} />
        <Banner showing={show}>
          To submit, please make sure you have 6 alphabetic characters
        </Banner>
        <form onSubmit={handleSubmit}>
          <input
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            className={styles.input}
            maxLength={6}
            onChange={handleChange}
            type="text"
          />
          <button className={styles.submit} type="submit">
            Solve
          </button>
        </form>
        <p className={styles.subtitle}>Word Combinations</p>
        <div className={styles["word-grid"]}>
          {loading && <p className={styles.info}>Loading...</p>}
          {words.map((word) => (
            <div key={word} className={styles.word}>
              {word}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default WordHunt;
