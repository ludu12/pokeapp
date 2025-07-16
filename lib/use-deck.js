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
    
    // Find if pokemon is already in deck
    const existingIndex = newDeck.findIndex((p) => p?.id === pokemon.id);
    
    if (existingIndex !== -1) {
      // Pokemon exists in deck, remove it
      newDeck[existingIndex] = null;
    } else {
      // Pokemon doesn't exist in deck, add it
      // Find first empty slot
      const emptyIndex = newDeck.findIndex((p) => p === null);
      
      if (emptyIndex !== -1) {
        // Found empty slot, add pokemon there
        newDeck[emptyIndex] = pokemon;
      } else {
        // No empty slots, replace last pokemon
        newDeck[newDeck.length - 1] = pokemon;
      }
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
