import PropTypes from 'prop-types';
import React from 'react';
import { colorToRGBA } from '../lib/utils/color-utils';
import classes from '../styles/Pokemon.module.css';
import { Sprite } from './Sprite';

const CheckMark = (props) => {
  const { isSmall } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classes.checkmark}
      height={isSmall ? '1rem' : '2rem'}
      viewBox="0 0 20 20"
      fill="currentColor">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );
};

CheckMark.propTypes = {
  isSmall: PropTypes.bool
};

export const Card = (props) => {
  const { pokemon, onClick, isSelected, isSmall } = props;

  const spriteHeight = isSmall ? 48 : 96;

  if (!pokemon) {
    return (
      <div className={`${classes.card} ${classes.empty}`}>
        <Sprite height={spriteHeight} />
      </div>
    );
  }

  return (
    <div
      className={`${classes.card} ${classes.focusable} ${isSmall ? classes.smallCard : ''}`}
      style={{ backgroundColor: colorToRGBA(pokemon.color, 0.3) }}
      onClick={onClick}>
      {isSelected && <CheckMark isSmall={isSmall} />}
      <Sprite pokemon={pokemon} height={spriteHeight} />
      <div className={`${classes.info} ${isSmall ? classes.smallInfo : ''}`}>
        <div className={classes.name}>{pokemon.name}</div>
        <div className={classes.types}>
          {pokemon.types
            .map((t) => <img key={t.name} src={t.typeBadgeUrl} alt={'type'} />)
            .reverse()}
          {/*  small hack here inorder to get primary type first, using row reverse for style in order to preserve flex-end + space-between*/}
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  pokemon: PropTypes.object,
  onClick: PropTypes.func,
  isSelected: PropTypes.bool,
  isSmall: PropTypes.bool
};
