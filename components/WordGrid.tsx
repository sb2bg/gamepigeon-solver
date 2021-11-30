import styles from "../styles/WordGrid.module.css";

interface WordGridProps {
  words: string[];
  loading: boolean;
}

const WordGrid: React.FC<WordGridProps> = ({ words, loading }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (words.length === 0) {
    return <div>No Words</div>;
  }

  return (
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
