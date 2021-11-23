import Head from "next/head";
import styles from "../styles/Index.module.css";

const WordHunt = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Word Hunt Solver</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Word Hunt Solver</h1>
      </main>
    </div>
  );
};

export default WordHunt;
