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
              <p>
                Visualize all the swipe paths you need to make to get the
                largest words.
              </p>
            </a>
          </Link>

          <Link href="/anagrams">
            <a className={styles.card}>
              <h2>Anagrams &rarr;</h2>
              <p>
                Find all the large and small words you can make with your six
                letters.
              </p>
            </a>
          </Link>

          <Link href="/tic-tac-toe">
            <a className={styles.card}>
              <h2>Tic-Tac-Toe &rarr;</h2>
              <p>
                Play the best move possible, the best your opponent can do is
                tie you.
              </p>
            </a>
          </Link>

          <Link href="/four-in-a-row">
            <a className={styles.card}>
              <h2>Four in a Row &rarr;</h2>
              <p>
                Solved game, meaning the outcome is always known from any
                position.
              </p>
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
