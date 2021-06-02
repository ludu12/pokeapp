import PropTypes from 'prop-types';
import React from 'react';
import classes from '../styles/Pokemon.module.css';

export const PokemonCards = (props) => {
  const { children } = props;

  return <ul className={classes.pokemonCards}>{children}</ul>;
};

PokemonCards.propTypes = {
  children: PropTypes.node
};
