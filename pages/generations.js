import React from 'react';
import { Card } from '../components/Card';
import { Layout } from '../components/Layout';
import { PokemonCards } from '../components/PokemonCards';
import { fetchGenerations } from '../lib/pokeapi/fetch-generations';
import { fetchPokemon } from '../lib/pokeapi/fetch-pokemon';

export default function Generations() {
  const [pokemon, setPokemon] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const [loadingGenerations, setLoadingGenerations] = React.useState(false);
  const [generations, setGenerations] = React.useState([]);
  const [generation, setGeneration] = React.useState(1);

  React.useEffect(() => {
    setLoading(true);
    fetchPokemon(generation)
      .then((x) => {
        setPokemon(x.pokemon);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [generation]);

  React.useEffect(() => {
    setLoadingGenerations(true);
    fetchGenerations()
      .then((x) => {
        setGenerations(x.generations);
      })
      .finally(() => {
        setLoadingGenerations(false);
      });
  }, []);

  return (
    <Layout title={'Generations'}>
      {loading || loadingGenerations ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <label>
            Generation: &nbsp;
            <select
              id="generation"
              value={generation}
              onChange={(e) => {
                setGeneration(e.target.value);
              }}>
              {generations.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.id}
                </option>
              ))}
            </select>
          </label>
          <PokemonCards>
            {pokemon?.map((p) => (
              <Card key={p.id} pokemon={p} />
            ))}
          </PokemonCards>
        </>
      )}
    </Layout>
  );
}
