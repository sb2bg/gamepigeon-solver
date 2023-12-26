import styles from "../styles/WordGrid.module.css";

interface WordGridProps {
  words: string[];
  onClick?: (word: string) => void;
  loading: boolean;
}

const WordGrid: React.FC<WordGridProps> = ({words, onClick, loading}) => {
  return loading ? (
    <div>Loading...</div>
  ) : words.length === 0 ? (
    <div>No Words</div>
  ) : (
    <div className={styles.grid}>
      {words.map((word) => (
        <div
          key={word}
          className={styles.item}
          onMouseEnter={() => onClick && onClick(word)}
        >
          {word}
        </div>
      ))}
    </div>
  );
};

export default WordGrid;
