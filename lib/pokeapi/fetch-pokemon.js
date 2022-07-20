import axios from 'axios';
import { ApiUrl, Queries } from './queries';

const TYPE_BADGE_URL = 'https://veekun.com/dex/media/types/en/';
const SPRITE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

const mapper = (x) => {
  // Don't care about alola...
  const pokemon = x.pokemon_v2_pokemons[0];
  return {
    id: x.id,
    genId: x.generation_id,
    name: pokemon.name,
    color: x.pokemon_v2_pokemoncolor.name,
    types: pokemon.pokemon_v2_pokemontypes?.map((t) => {
      const name = t.pokemon_v2_type.name;
      return {
        name: name,
        typeBadgeUrl: `${TYPE_BADGE_URL}${name}.png`
      };
    }),
    sprite: `${SPRITE_URL}${x.id}.png`
  };
};

export async function fetchPokemonByGen(genId = 1) {
  const generation = genId.length ? genId : [Number(genId)]
  try {
    const response = await axios.post(
      ApiUrl,
      {
        query: Queries.fetchPokemonByGen,
        variables: {
          gen_ids: generation
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return {
      errors: response.data.errors,
      pokemon: response.data.data?.pokemon_v2_pokemonspecies?.map?.(mapper) || [],
      generation
    };
  } catch (e) {
    console.error(e);
    return { errors: [e], pokemon: [], generation: null };
  }
}

export async function fetchPokemonByIds(ids) {
  try {
    const response = await axios.post(
      ApiUrl,
      {
        query: Queries.fetchPokemonById,
        variables: {
          ids: ids
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return {
      errors: response.data.errors,
      pokemon: response.data.data?.pokemon_v2_pokemonspecies?.map?.(mapper) || []
    };
  } catch (e) {
    console.error(e);
    return { errors: [e], pokemon: [] };
  }
}
