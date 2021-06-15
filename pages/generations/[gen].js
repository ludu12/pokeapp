import PropTypes from 'prop-types';
import React from 'react';
import { Card } from '../../components/Card';
import { Layout } from '../../components/Layout';
import { PokemonCards } from '../../components/PokemonCards';
import { getStaticGenerations, getStaticPokemonByGen } from '../../lib/utils/static-utils';

export const getStaticPaths = getStaticGenerations;
export const getStaticProps = getStaticPokemonByGen();

export default function Gen(props) {
  const { pokemon, generation } = props;

  return (
    <Layout title={`Generation: ${generation}`}>
      <PokemonCards>
        {pokemon?.map((p) => (
          <Card key={p.id} pokemon={p} />
        ))}
      </PokemonCards>
    </Layout>
  );
}

Gen.propTypes = {
  pokemon: PropTypes.array,
  generation: PropTypes.number
};
