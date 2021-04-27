import styles from "../styles/Deck.module.css";
import { Card } from "./Card";

export const Deck = (props) => {
  return (
    <div className={styles.deck}>
      {Array.from([1, 2, 3, 4, 5, 6], (x) => {
        return <Card />;
      })}
    </div>
  );
};
