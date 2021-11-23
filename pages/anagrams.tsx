import Head from "next/head";
import AnagramLetters from "../components/AnagramLetters";
import styles from "../styles/Index.module.css";

const WordHunt = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Anagrams Solver</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Anagrams Solver</h1>

        <AnagramLetters />

        <p className={styles.description}>Word Combinations</p>
      </main>
    </div>
  );
};

export default WordHunt;
