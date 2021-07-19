import axios from 'axios';
import React from 'react';
import { fetchPokemonByIds } from './pokeapi/fetch-pokemon';
import { download } from './utils/download-utils';

export const useDeck = () => {
  // Start with a deck of 6
  const [deck, setDeck] = React.useState([null, null, null, null, null, null]);
  const [name, setName] = React.useState(null);
  const validCards = deck.filter(Boolean);

  const toggleHandler = (pokemon) => () => {
    const index = deck.findIndex((x) => x?.id === pokemon.id);
    let newDeck;
    if (index >= 0) {
      newDeck = [...deck.slice(0, index), null, ...deck.slice(index + 1)];
    } else {
      let nextNullIndex = deck.findIndex((x) => !x?.id);
      nextNullIndex = nextNullIndex === -1 ? 5 : nextNullIndex;
      newDeck = [...deck.slice(0, nextNullIndex), pokemon, ...deck.slice(nextNullIndex + 1)];
    }
    setDeck(newDeck);
  };

  const isSelected = (pokemon) => {
    return Boolean(validCards.find((x) => x.id === pokemon.id));
  };

  const clearDeck = () => {
    setDeck([null, null, null, null, null, null]);
  };

  const downloadDeck = () => {
    download(
      'my-deck.json',
      JSON.stringify({
        deck: deck.map((d) => ({ id: d.id }))
      }),
      'application/json'
    );
  };

  const randomizeDeck = (pokemon) => () => {
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

      if (Array.isArray(deck) && deck.every((d) => Boolean(Number(d.id)))) {
        const ids = deck.map((d) => d.id);

        const { pokemon, errors } = await fetchPokemonByIds(ids);
        if (errors) {
          error = errors[0];
        } else if (pokemon.length > 6) {
          error = new Error(
            `Invalid deck size. Found extra pokemon with ids: ${pokemon.slice(6).map((p) => p.id)}`
          );
        } else if (pokemon.length < 6) {
          error = new Error(
            `Invalid deck size. Only found pokemon for ids: ${pokemon.map((p) => p.id)}`
          );
        }

        setDeck(pokemon);
        setName(name);
      } else {
        error = new Error('Invalid deck');
      }
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
