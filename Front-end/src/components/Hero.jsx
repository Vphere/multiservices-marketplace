import styles from "./Hero.module.css";
import SearchBar from "./SearchBar.jsx";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Book trusted services
          <span className={styles.highlight}> at your doorstep</span>
        </h1>

        <p className={styles.heroSubtitle}>
          Professional services for home, lifestyle, fitness, and more
        </p>

        <div className={styles.heroSearch}>
          <SearchBar />
        </div>
      </div>

      <div className={styles.heroImage}>
        <div className={styles.orbitWrapper}>
          <div className={styles.orbit}>
            <div className={styles.orbitTrack}>
              <div className={styles.item}><img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9" /></div>
              <div className={styles.item}><img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952" /></div>
              <div className={styles.item}><img src="https://images.unsplash.com/photo-1599058917212-d750089bc07e" /></div>
              <div className={styles.item}><img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874" /></div>
              <div className={styles.item}><img src="https://images.unsplash.com/photo-1511379938547-c1f69419868d" /></div>
              <div className={styles.item}><img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773" /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;