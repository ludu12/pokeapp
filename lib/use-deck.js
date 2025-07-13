import axios from 'axios';
import React from 'react';
import { download } from './utils/download-utils';
import { fetchPokemonByIds } from './pokeapi/fetch-pokemon';

const initialState = [null, null, null, null, null, null];

export const useDeck = (initial = initialState) => {
  // Start with a deck of 6
  const [deck, setDeck] = React.useState(initial);
  const [name, setName] = React.useState(null);

  const toggleHandler = (pokemon) => () => {
    let newDeck = [...deck];
    // Given a pokemon how can I:
    // 1. Add it to my deck if it is no already in my deck
    // 2. Delete it from my deck if it already is in my deck
    // Hint: checkout javascript standard array functions: 'findIndex'
    const found = deck.findIndex((p) => {
      return p ? p.id === pokemon.id : false;
    });
    if (found === -1) {
      // If we didn't find it, then let's get the next null index
      const nextNullIndex = deck.findIndex((p) => !p);
      let nextIndex = nextNullIndex;
      if (nextNullIndex === -1) {
        // If our deck is full, let's just use the last spot
        nextIndex = deck.length - 1;
      }
      newDeck[nextIndex] = pokemon;
    } else {
      // If we found the pokemon, just null it out
      newDeck[found] = null;
    }

    setDeck(newDeck);
  };

  const isSelected = (pokemon) => {
    // Given a pokemon, how can i tell if it is in my deck or not?
    const found = deck.findIndex((p) => p?.id === pokemon.id);
    return found !== -1;
  };

  const clearDeck = () => {
    // How should I clear this deck?
    setDeck(initialState);
  };

  const downloadDeck = () => {
    // I want to download this deck to use as my db.json
    // Check out ./utils/download-utils.js
    download(
      'deck.json',
      JSON.stringify(
        deck.map((x) => {
          return { id: x.id };
        })
      ),
      'application/json'
    );
  };

  const randomizeDeck = (pokemon) => () => {
    // Given a list of pokemon, how can I generate a random deck?
    // Hint: How can I generate a random list of indices?
    const arrIndices = [];
    while (arrIndices.length < 6) {
      const r = Math.floor(Math.random() * pokemon.length); // random pokemon index
      if (arrIndices.indexOf(r) === -1) {
        arrIndices.push(r);
      }
    }
    setDeck(arrIndices.map((i) => pokemon[i]));
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
      // error = new Error(`What am I supposed to do with this??: ${JSON.stringify({ deck, name })}`);

      const result = await fetchPokemonByIds(
        deck.map((x) => {
          return x.id;
        })
      );
      setDeck(result.pokemon);
      setName(name);
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
