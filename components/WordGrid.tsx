import styles from "../styles/WordGrid.module.css";

interface WordGridProps {
  words: string[];
  loading: boolean;
}

const WordGrid: React.FC<WordGridProps> = ({words, loading}) => {
  return loading ? (
    <div>Loading...</div>
  ) : words.length === 0 ? (
    <div>No Words</div>
  ) : (
    <div className={styles.grid}>
      {words.map((word) => (
        <div key={word} className={styles.item}>
          {word}
        </div>
      ))}
    </div>
  );
};

export default WordGrid;
