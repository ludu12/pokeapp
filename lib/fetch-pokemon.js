import axios from "axios";

const API_URL = "https://beta.pokeapi.co/graphql/v1beta";
const BADGE_URL = "https://veekun.com/dex/media/types/en/";

const query = `
query fetchPokemon($generation_id: Int!) {
  pokemon_v2_pokemonspecies(order_by: {id: asc} where: {generation_id: {_eq: $generation_id}}) {
    id
    name
    pokemon_v2_pokemoncolor {
      name
    }
    pokemon_v2_pokemons {
      name
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
}
`;

const mapper = (x) => {
  const pokemon = x.pokemon_v2_pokemons[0]; // Using first gen no alola
  return {
    id: x.id,
    name: pokemon.name,
    color: x.pokemon_v2_pokemoncolor.name,
    types: pokemon.pokemon_v2_pokemontypes?.map((t) => {
      const name = t.pokemon_v2_type.name;
      return {
        name: name,
        badgeUrl: `${BADGE_URL}${name}.png`
      };
    })
  };
};

export async function fetchPokemon(genId = 1) {
  try {
    const response = await axios.post(
      API_URL,
      {
        query: query,
        variables: {
          generation_id: genId
        }
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return {
      errors: [],
      pokemon: response.data.data.pokemon_v2_pokemonspecies.map(mapper)
    };
  } catch (e) {
    console.error(e);
    return { errors: [e], pokemon: [] };
  }
}
