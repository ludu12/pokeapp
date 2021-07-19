import PropTypes from 'prop-types';
import React from 'react';
import { Card } from '../components/Card';
import { ClearAction, DownloadAction, RandomizeAction } from '../components/DeckActions';
import { DeckForm } from '../components/DeckForm';
import { Layout } from '../components/Layout';
import { PokemonCards } from '../components/PokemonCards';
import { Sprite } from '../components/Sprite';
import { useDeck } from '../lib/use-deck';
import { useOnScreen } from '../lib/use-on-screen';
import { getStaticPokemonByGen } from '../lib/utils/static-utils';
import classes from '../styles/Home.module.css';

export const getStaticProps = getStaticPokemonByGen(1);

export default function Home({ pokemon }) {
  // const { deck, clearDeck, downloadDeck, randomizeDeck, fetchDeck, toggleHandler, isSelected } =
  //   useDeck();

  return (
    <div className={classes.welcome}>
      <h1>
        Welcome Tech Camp! 🏕️
      </h1>
      <p>Edit <code>pages/index.js</code> to get started!</p>
    </div>
  );
}

Home.propTypes = {
  pokemon: PropTypes.array
};
