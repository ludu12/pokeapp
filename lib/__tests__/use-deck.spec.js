/**
 * @jest-environment jsdom
 */
import { renderHook } from '@testing-library/react';
import { act } from 'react';
import axios from 'axios';
import { fetchPokemonByIds } from '../pokeapi/fetch-pokemon';
import { useDeck } from '../use-deck';
import { download } from '../utils/download-utils';
import { expect, jest, describe, it } from '@jest/globals';

jest.mock('axios');
jest.mock('../pokeapi/fetch-pokemon');
jest.mock('../utils/download-utils');

describe('useDeck hook', () => {
  describe('toggleHandler', () => {
    it('should add to deck', () => {
      const newPokemon = { id: 1 };
      const { result } = renderHook(() => useDeck());
      act(() => result.current.toggleHandler(newPokemon)());

      expect(result.current.deck).toEqual([{ id: 1 }, null, null, null, null, null]);
    });

    it('should add to deck with multiple', () => {
      const newPokemon = { id: 5 };
      const { result } = renderHook(() =>
        useDeck([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, null, null])
      );
      act(() => result.current.toggleHandler(newPokemon)());

      expect(result.current.deck).toEqual([
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        null
      ]);
    });

    it('should add to deck with empty spot', () => {
      const newPokemon = { id: 3 };
      const { result } = renderHook(() =>
        useDeck([{ id: 1 }, { id: 2 }, null, { id: 4 }, null, null])
      );
      act(() => result.current.toggleHandler(newPokemon)());

      expect(result.current.deck).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, null, null]);
    });

    it('should add to full deck by replacing last one', () => {
      const newPokemon = { id: 7 };
      const { result } = renderHook(() =>
        useDeck([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }])
      );
      act(() => result.current.toggleHandler(newPokemon)());

      expect(result.current.deck).toEqual([
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 7 }
      ]);
    });

    it('should remove from deck', () => {
      const removePokemon = { id: 1 };
      const { result } = renderHook(() => useDeck([{ id: 1 }, null, null, null, null, null]));
      act(() => result.current.toggleHandler(removePokemon)());

      expect(result.current.deck).toEqual([null, null, null, null, null, null]);
    });

    it('should remove from deck with multiple', () => {
      const removePokemon = { id: 3 };
      const { result } = renderHook(() =>
        useDeck([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, null, null])
      );
      act(() => result.current.toggleHandler(removePokemon)());

      expect(result.current.deck).toEqual([{ id: 1 }, { id: 2 }, null, { id: 4 }, null, null]);
    });
  });

  describe('isSelected', () => {
    it('should return true when pokemon is in deck', () => {
      const { result } = renderHook(() =>
        useDeck([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, null, null])
      );
      expect(result.current.isSelected({ id: 1 })).toEqual(true);
    });

    it('should return false when pokemon is not in deck', () => {
      const { result } = renderHook(() =>
        useDeck([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, null, null])
      );
      expect(result.current.isSelected({ id: 7 })).toEqual(false);
    });
  });

  describe('clearDeck', () => {
    it('should reset deck to initialState ', () => {
      const { result } = renderHook(() =>
        useDeck([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, null, null])
      );
      act(() => {
        result.current.clearDeck();
      });

      expect(result.current.deck).toEqual([null, null, null, null, null, null]);
    });
  });

  describe.skip('downloadDeck', () => {
    it('should download to deck.json', () => {
      const deck = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }];
      const { result } = renderHook(() => useDeck(deck));
      result.current.downloadDeck();
      expect(download).toHaveBeenCalledTimes(1);
      expect(download).toBeCalledWith('deck.json', JSON.stringify(deck), 'application/json');
    });
  });

  describe('randomizeDeck', () => {
    const pokemonList = Array.from(Array(20).keys()).map((id) => ({ id }));
    it('should fill up deck and not use the same pokemon twice', () => {
      const { result } = renderHook(() => useDeck());
      act(() => {
        result.current.randomizeDeck(pokemonList)();
      });

      const newDeck = result.current.deck;
      expect(newDeck.length).toEqual(6);
      const unique = [...new Set(newDeck)];
      expect(unique.length).toEqual(6);
    });
  });

  describe.skip('fetchDeck', () => {
    describe('when axios succeeds', () => {
      let deck, fetchedPokemon;
      beforeEach(() => {
        deck = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }];
        fetchedPokemon = deck.map((x) => ({ id: x.id, name: `pokemon-${x.id}` }));
        axios.get.mockResolvedValue({ data: { deck, name: 'Name' } });
        fetchPokemonByIds.mockResolvedValue({ pokemon: fetchedPokemon });
      });
      it('should set deck and name from fetched pokemon', async () => {
        const { result } = renderHook(() => useDeck());

        let error;
        await act(async () => {
          error = await result.current.fetchDeck('url');
        });
        expect(error).toEqual(null);
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toBeCalledWith('url');

        expect(fetchPokemonByIds).toHaveBeenCalledTimes(1);
        expect(fetchPokemonByIds).toBeCalledWith([1, 2, 3, 4, 5, 6]);

        expect(result.current.deck).toEqual(fetchedPokemon);
        expect(result.current.name).toEqual('Name');
      });
    });

    describe('when axios fails', () => {
      beforeEach(() => {
        axios.get.mockRejectedValue(new Error('test'));
      });
      it('should return error', async () => {
        const { result } = renderHook(() => useDeck());

        const error = await result.current.fetchDeck('url');

        expect(error.message).toEqual('test');
      });
    });
  });
});
