import styles from "../styles/Home.module.css";
import Nav from "../components/nav";

export default function Home() {
  return (
    <div className={styles.container}>
      <Nav>Nav</Nav>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Explore <a href="#">Resist Tools!</a>
        </h1>
      </main>

      <footer className={styles.footer}>Powered by the people ↯</footer>
    </div>
  );
}
