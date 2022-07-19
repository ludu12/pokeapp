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
  const { deck, clearDeck, downloadDeck, randomizeDeck, fetchDeck, toggleHandler, isSelected } =
    useDeck();
  const ref = React.useRef();
  const isDeckOnScreen = useOnScreen(ref);

  return (
    <Layout title={'Home'}>
      <section id="deck" className={classes.deckContainer}>
        <h2>Deck</h2>

        {/* It would be cool to have some actions here... */}
        <div className={classes.actions}>
          <RandomizeAction onClick={randomizeDeck(pokemon)} />
          <DownloadAction onClick={downloadDeck} />
          <ClearAction onClick={clearDeck} />
        </div>

        {/* This is a cool feature for loading a friends deck! */}
        <DeckForm className={classes.deckForm} fetchDeck={fetchDeck} />

        <div ref={ref} className={classes.deck}>
          {/* Where are my cards? */}
          <PokemonCards>
            {deck?.map((p, i) => (
              <Card key={p?.id || `index${i}`} pokemon={p} onClick={toggleHandler(p)} isSelected />
            ))}
          </PokemonCards>
        </div>
      </section>

      {/* Show me some pokemon cards! */}
      <PokemonCards>
        {pokemon?.map((p) => (
          <Card
            key={p.id}
            pokemon={p}
            onKeyDown={toggleHandler(p)}
            onClick={toggleHandler(p)}
            isSmall
            isSelected={isSelected(p)}
          />
        ))}
      </PokemonCards>

      {/* This is a cool feature for when you scroll and still want to see your deck! */}
      {!isDeckOnScreen && (
        <div className={classes.floatingDeck}>
          <h4>Deck</h4>
          {deck?.map((p, i) => (
            <Sprite key={p?.id || `index${i}`} pokemon={p} height={46} onClick={toggleHandler(p)} />
          ))}
        </div>
      )}
    </Layout>
  );
}

Home.propTypes = {
  pokemon: PropTypes.array
};
