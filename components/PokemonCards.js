import React from 'react';
import classes from '../styles/PokemonList.module.css';

export const PokemonCards = (props) => {
  const { children } = props;

  return <ul className={classes.pokemonCards}>{children}</ul>;
};
