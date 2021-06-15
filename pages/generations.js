import React from 'react';
import { Card } from '../components/Card';
import { Layout } from '../components/Layout';
import { PokemonCards } from '../components/PokemonCards';
import { useFetchGenerations, useFetchPokemonByGen } from '../lib/use-fetch-pokemon';

export default function Generations() {
  const [generation, setGeneration] = React.useState(1);
  const { generations, isLoading: isLoadingGenerations } = useFetchGenerations();
  const { pokemon, isLoading: isLoadingPokemon } = useFetchPokemonByGen(generation);

  return (
    <Layout title={'Generations'}>
      {isLoadingPokemon || isLoadingGenerations ? (
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
