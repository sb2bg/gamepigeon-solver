import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Index.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>GamePigeon Solver</title>
        <meta
          name="description"
          content="Website to help you beat your friends at iMessage games."
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>GamePigeon Solver</h1>

        <p className={styles.description}>
          Choose a game below to start winning
        </p>

        <div className={styles.grid}>
          <Link href="/word-hunt">
            <a className={styles.card}>
              <h2>
                <i
                  className="fas fa-search"
                  style={{ color: "var(--primary)" }}
                ></i>{" "}
                Word Hunt
              </h2>
              <p>
                Visualize all the swipe paths needed to find the largest words
                in the grid. Become unbeatable at Word Hunt.
              </p>
            </a>
          </Link>

          <Link href="/anagrams">
            <a className={styles.card}>
              <h2>
                <i
                  className="fas fa-font"
                  style={{ color: "var(--secondary)" }}
                ></i>{" "}
                Anagrams
              </h2>
              <p>
                Discover all possible words from your six letters. Find words
                your opponents would never spot.
              </p>
            </a>
          </Link>

          <Link href="/tic-tac-toe">
            <a className={styles.card}>
              <h2>
                <i
                  className="fas fa-times"
                  style={{ color: "var(--accent1)" }}
                ></i>{" "}
                Tic-Tac-Toe
              </h2>
              <p>
                Make the perfect move every time. Force your opponent into a tie
                at worst, or secure a victory when they make a mistake.
              </p>
            </a>
          </Link>

          <Link href="/four-in-a-row">
            <a className={styles.card}>
              <h2>
                <i
                  className="fas fa-circle"
                  style={{ color: "var(--accent2)" }}
                ></i>{" "}
                Four in a Row
              </h2>
              <p>
                Leverage perfect gameplay with our solver that analyzes every
                possible position. Always make the optimal move.
              </p>
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
