import React from 'react';
import { Card } from '../components/Card';
import { Layout } from '../components/Layout';
import { PokemonCards } from '../components/PokemonCards';
import { useDeck } from '../lib/use-deck';

export default function MyDeck() {
  const { deck, name, fetchDeck } = useDeck();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    setIsLoading(true);
    fetchDeck('/api/deck')
      .then((e) => setError(e?.message))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Layout title={`My Deck`}>
      <p>Here is my deck as fetched from my server:</p>
      <span className={'error'}>{error}</span>
      <h3>{name}</h3>
      <PokemonCards>
        {deck?.map((p, i) => (
          <Card key={p?.id || `index${i}`} pokemon={p} isLoading={isLoading} />
        ))}
      </PokemonCards>
    </Layout>
  );
}
