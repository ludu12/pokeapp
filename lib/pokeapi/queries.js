/*
 Check out graphql console: https://beta.pokeapi.co/graphql/console/
*/
export const ApiUrl = 'https://beta.pokeapi.co/graphql/v1beta';

const fetchGenerations = `
query fetchGeneration {
  pokemon_v2_generation {
    id
  }
}
`;

const fetchPokemonByGen = `
query fetchPokemon($gen_ids: [Int!]) {
  pokemon_v2_pokemonspecies(order_by: {id: asc} where: {generation_id: {_in: $gen_ids}}) {
    id
    generation_id
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

const fetchPokemonById = `
query fetchPokemon($ids: [Int!]) {
  pokemon_v2_pokemonspecies(order_by: {id: asc} where: {id: {_in: $ids}}) {
    id
    generation_id
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

export const Queries = {
  fetchGenerations,
  fetchPokemonByGen,
  fetchPokemonById
};
