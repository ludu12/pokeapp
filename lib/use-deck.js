import axios from 'axios';
import React from 'react';
import { fetchPokemonByIds } from './pokeapi/fetch-pokemon';
import { download } from './utils/download-utils';

const initialState = [null, null, null, null, null, null];

export const useDeck = (initial = initialState) => {
  // Start with a deck of 6
  const [deck, setDeck] = React.useState(initial);
  const [name, setName] = React.useState(null);

  const toggleHandler = (pokemon) => () => {
    // Given a pokemon how can I:
    // 1. Add it to my deck if it is no already in my deck
    // 2. Delete it from my deck if it already is in my deck
    // Hint: checkout javascript stand array functions: 'findIndex' and 'slice'
  };

  const isSelected = (pokemon) => {
    // Given a pokemon, how can i tell if it is in my deck or not?
  };

  const clearDeck = () => {
    // How should I clear this deck?
  };

  const downloadDeck = () => {
    // I want to download this deck to use as my db.json
    // Check out ./utils/download-utils.js
  };

  const randomizeDeck = (pokemon) => () => {
    // Given a list of pokemon, how can I generate a random deck?
    // Hint: How can I generate a random list of indices?
  };

  const fetchDeck = async (url) => {
    let error = null;
    try {
      const {
        data: { deck, name }
      } = await axios.get(url);

      // What do we need to do with this data from our server?
      // If deck is just a list of ids, how can I load the actual data?
      // Hint: Checkout ./pokeapi/fetch-pokemon'

      error = new Error(`What am I supposed to do with this??: ${JSON.stringify({ deck, name })}`);
    } catch (e) {
      error = e;
    }
    return error;
  };

  return {
    deck,
    name,
    clearDeck,
    downloadDeck,
    randomizeDeck,
    fetchDeck,
    toggleHandler,
    isSelected
  };
};
