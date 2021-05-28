import React from "react";
import {Card} from "../components/Card";
import {Layout} from "../components/Layout";
import {PokemonCards} from "../components/PokemonCards";
import {fetchGenerations} from "../lib/pokeapi/fetch-generations";
import {fetchPokemon} from "../lib/pokeapi/fetch-pokemon";
import {getStaticGenerations, getStaticPokemon} from "../lib/utils/static-utils";
import styles from "../styles/Home.module.css";

export const getStaticProps = getStaticPokemon();

export default function MyDeck(props) {
    const {pokemon} = props;

    return (
        <Layout title={`My Deck`}>
            <PokemonCards>
                {pokemon?.map((p) => <Card key={p.id} pokemon={p}/>)}
            </PokemonCards>
        </Layout>
    )
}
