import React from 'react';
import { Card } from '../components/Card';
import { DeckForm } from '../components/DeckForm';
import { Layout } from '../components/Layout';
import { PokemonCards } from '../components/PokemonCards';
import { Sprite } from '../components/Sprite';
import { useDeck } from '../lib/use-deck';
import { useOnScreen } from '../lib/use-on-screen';
import { getStaticPokemon } from '../lib/utils/static-utils';
import classes from '../styles/Home.module.css';

export const getStaticProps = getStaticPokemon(1);

export default function Home({ pokemon }) {
  const { deck, clearDeck, downloadDeck, fetchDeck, toggleHandler, isSelected } = useDeck();
  const ref = React.useRef();
  const isDeckOnScreen = useOnScreen(ref);

  return (
    <Layout title={'Home'}>
      <section id="deck" className={classes.deckContainer}>
        <h2 ref={ref}>Deck</h2>
        <DeckForm fetchDeck={fetchDeck}/>
        <div className={classes.actions}>
          <button title={'Download'} onClick={downloadDeck} >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </button>
          <button title={'Clear'} onClick={clearDeck}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        <div className={classes.deck}>
          <PokemonCards>
            {deck?.map((p, i) => (
              <Card key={p?.id || `index${i}`} pokemon={p} onClick={toggleHandler(p)} isSelected />
            ))}
          </PokemonCards>
        </div>
      </section>
      <PokemonCards>
        {pokemon?.map((p) => (
          <Card
            key={p.id}
            pokemon={p}
            onClick={toggleHandler(p)}
            isSmall
            isSelected={isSelected(p)}
          />
        ))}
      </PokemonCards>
      {!isDeckOnScreen && (
        <div className={classes.floatingDeck}>
          {deck?.map((p, i) => (
            <Sprite key={p?.id || `index${i}`} pokemon={p} height={46} onClick={toggleHandler(p)} />
          ))}
        </div>
      )}
    </Layout>
  );
}
