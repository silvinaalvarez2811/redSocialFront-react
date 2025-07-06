import styles from "./Banner.module.css";
import bannerImage from "../../assets/banner.avif";

const Banner = () => {
  return (
    <div
      className={styles.banner}
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div className={styles.content}>
        <h1>BIENVENIDO A LA RED SOCIAL UNAHUR</h1>
      </div>
    </div>
  );
};

export default Banner;
