import React from 'react';
import { fetchGenerations } from './pokeapi/fetch-generations';
import { fetchPokemonByGen } from './pokeapi/fetch-pokemon';

export const useFetchGenerations = () => {
  const [generations, setGenerations] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    fetchGenerations()
      .then((x) => {
        setGenerations(x.generations);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { generations, isLoading };
};

export const useFetchPokemonByGen = (genId) => {
  const [pokemon, setPokemon] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    fetchPokemonByGen(genId)
      .then((x) => {
        setPokemon(x.pokemon);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [genId]);

  return { pokemon, isLoading };
};
