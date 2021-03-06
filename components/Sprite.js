import PropTypes from 'prop-types';
import React from 'react';
import classes from '../styles/Pokemon.module.css';

export const Sprite = (props) => {
  const { pokemon, height, isLoading, ...rest } = props;

  if (!pokemon) {
    return (
      <svg
        className={isLoading ? classes.loading : ''}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        height={height}
        width={height}>
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  return (
    <div className={`${rest.onClick ? classes.focusable : ''}`} style={{ fontSize: 0 }}>
      <img
        title={pokemon.name}
        className={classes.sprite}
        height={height}
        width={height}
        src={pokemon.sprite}
        alt={pokemon.name}
        {...rest}
      />
    </div>
  );
};

Sprite.propTypes = {
  pokemon: PropTypes.object,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isLoading: PropTypes.bool
};
