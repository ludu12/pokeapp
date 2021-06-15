import { fetchGenerations } from '../pokeapi/fetch-generations';
import { fetchPokemonByGen } from '../pokeapi/fetch-pokemon';

export const getStaticPokemonByGen =
  (gen) =>
  async ({ params }) => {
    const { pokemon, generation } = await fetchPokemonByGen(gen || params?.gen);
    return {
      props: {
        pokemon,
        generation
      }
    };
  };

export const getStaticGenerations = async () => {
  const { generations } = await fetchGenerations();

  const paths = generations.map((generation) => ({
    params: { gen: `${generation.id}` }
  }));
  return {
    paths,
    fallback: false
  };
};
