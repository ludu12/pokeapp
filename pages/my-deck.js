import axios from "axios";
import React from "react";
import { Card } from "../components/Card";
import { Layout } from "../components/Layout";
import { PokemonCards } from "../components/PokemonCards";
import { fetchPokemon } from "../lib/pokeapi/fetch-pokemon";


export default function MyDeck(props) {
  const [name, setName] = React.useState(null);
  const [deck, setDeck] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    axios.get("/api/deck").then((x) => {
      setName(x.data.name);
      setDeck(x.data.deck);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <Layout title={`My Deck`}>

      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <p>Here is my deck as fetched from my server:</p>
          <h3>{name}</h3>
          <PokemonCards>
            {deck?.map((p) => (
              <Card key={p.id} pokemon={p} />
            ))}
          </PokemonCards>
        </>
      )}
    </Layout>
  );
}
