import styles from "../styles/Card.module.css";

export const Card = (props) => {
  return (
    <div className={styles.card}>
      <h3>Name &rarr;</h3>
      <p>Find in-depth information about Next.js features and API.</p>
    </div>
  );
};
