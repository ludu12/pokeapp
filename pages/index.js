import Head from 'next/head';
import React from 'react';
import { Card } from '../components/Card';
import { Layout } from '../components/Layout';
import { PokemonCards } from '../components/PokemonCards';
import { getStaticPokemon } from '../lib/utils/static-utils';
import styles from '../styles/Home.module.css';

export const getStaticProps = getStaticPokemon(1);

export default function Home({ pokemon }) {
  // const [pokemon, setPokemon] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  // const [loading, setLoading] = React.useState(false);
  //
  // React.useEffect(() => {
  //   setLoading(true);
  //   fetchPokemon(1)
  //     .then((x) => {
  //       setPokemon(x.pokemon);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);

  return (
    <Layout title={'Home'}>
      <PokemonCards>
        {pokemon?.map((p) => (
          <Card key={p.id} pokemon={p} />
        ))}
      </PokemonCards>
    </Layout>
  );
}
