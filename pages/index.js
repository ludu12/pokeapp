import React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Deck } from "../components/Deck";
import { fetchPokemon } from "../lib/fetch-pokemon";

export default function Home() {
  const [pokemon, setPokemon] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    fetchPokemon(1)
      .then((x) => {
        setPokemon(x.pokemon);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokèmon Team Builder</title>
        <link rel="icon" href="/favicon.ico" />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>

      <main className={styles.main}>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <ul>
            {pokemon?.map((p) => {
              return (
                <li key={p.id}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span>{p.name}</span>
                    <span>
                      {p.types.map((t) => (
                        <img src={t.badgeUrl} />
                      ))}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
