import "../styles/globals.css";
import styles from "../styles/Index.module.css";
import type { AppProps } from "next/app";
import Link from "next/link";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div>
      <Link href="/">
        <a className={styles.home}>&larr; Home</a>
      </Link>
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
