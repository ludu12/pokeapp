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

export async function fetchPokemon(genId = 1) {
  try {
    const response = await axios.post(
      ApiUrl,
      {
        query: Queries.fetchPokemon,
        variables: {
          // Notice how this is an array of gen ids...
          gen_ids: [Number(genId)]
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
