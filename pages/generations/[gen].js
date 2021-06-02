import React from 'react';
import { Card } from '../../components/Card';
import { Layout } from '../../components/Layout';
import { PokemonCards } from '../../components/PokemonCards';
import { getStaticGenerations, getStaticPokemon } from '../../lib/utils/static-utils';

export const getStaticPaths = getStaticGenerations;
export const getStaticProps = getStaticPokemon();

export default function Gen(props) {
  const { pokemon, gen } = props;

  return (
    <Layout title={`Generation: ${gen}`}>
      <PokemonCards>
        {pokemon?.map((p) => (
          <Card key={p.id} pokemon={p} />
        ))}
      </PokemonCards>
    </Layout>
  );
}
