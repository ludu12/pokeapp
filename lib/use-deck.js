import React from 'react';
import axios from 'axios';
import { download } from './utils/download-utils';

export const useDeck = () => {
  // Start with a deck of 6
  const [deck, setDeck] = React.useState([null, null, null, null, null, null]);
  const [nextIndex, setNextIndex] = React.useState(0);
  const validCards = deck.filter(Boolean);

  const toggleHandler = (pokemon) => () => {
    const index = deck.findIndex((x) => x?.id === pokemon.id);
    let newDeck;
    if (index >= 0) {
      newDeck = [...deck.slice(0, index), null, ...deck.slice(index + 1)];
      setNextIndex(newDeck.findIndex((x) => !x?.id));
    } else {
      newDeck = [...deck.slice(0, nextIndex), pokemon, ...deck.slice(nextIndex + 1)];
      setNextIndex((nextIndex + 1) % 6);
    }
    setDeck(newDeck);
  };

  const isSelected = (pokemon) => {
    return Boolean(validCards.find((x) => x.id === pokemon.id));
  };

  const clearDeck = () => {
    setDeck([null, null, null, null, null, null]);
    setNextIndex(0);
  };

  const downloadDeck = () => {
    download(
      'my-deck.json',
      JSON.stringify({
        deck: deck
      }),
      'application/json'
    );
  };

  const fetchDeck = async (url) => {
    try {
      const response = await axios.get(url);

      if (Array.isArray(response.data.deck)) {
        setDeck(response.data.deck);
      } else {
        return new Error('Invalid Deck');
      }
    } catch (e) {
      return e;
    }
  };

  return { deck, clearDeck, downloadDeck, fetchDeck, toggleHandler, isSelected };
};