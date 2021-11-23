import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Index.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>GamePidgeon Solver</title>
        <meta
          name="description"
          content="Website to help you beat your friends over iMessage games."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>GamePidgeon Solver</h1>

        <p className={styles.description}>Select a game to play</p>

        <div className={styles.grid}>
          <Link href="/word-hunt">
            <a className={styles.card}>
              <h2>Word Hunt &rarr;</h2>
              <p>Find in-depth information about Next.js features and API.</p>
            </a>
          </Link>

          <Link href="/anagrams">
            <a className={styles.card}>
              <h2>Anagrams &rarr;</h2>
              <p>Learn about Next.js in an interactive course with quizzes!</p>
            </a>
          </Link>

          <a href="/tic-tac-toe" className={styles.card}>
            <h2>Tic-Tac-Toe &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a href="/four-in-a-row" className={styles.card}>
            <h2>Four in a Row &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>
    </div>
  );
};

export default Home;
