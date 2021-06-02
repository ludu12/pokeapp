import React from 'react';
import classes from '../styles/Pokemon.module.css';

export const PokemonCards = (props) => {
  const { children } = props;

  return <ul className={classes.pokemonCards}>{children}</ul>;
};
