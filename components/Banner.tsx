import styles from "../styles/Banner.module.css";

interface BannerProps {
  showing: boolean;
}

const Banner: React.FC<BannerProps> = ({ showing, children }) => {
  return (
    <div className={`${styles.banner} ${showing ? styles.showing : ""}`}>
      {children}
    </div>
  );
};

export default Banner;
