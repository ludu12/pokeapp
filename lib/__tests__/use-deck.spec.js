/**
 * @jest-environment jsdom
 */
import { act, renderHook } from '@testing-library/react-hooks';
import { useDeck } from '../use-deck';

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

  describe('downloadDeck', () => {
    // TODO
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

  describe('fetchDeck', () => {
    // TODO
  });
});
