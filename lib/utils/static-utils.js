import {fetchGenerations} from "../pokeapi/fetch-generations";
import {fetchPokemon} from "../pokeapi/fetch-pokemon";

export const getStaticPokemon = (generation) => async ({params}) => {
    const {pokemon, genId } = await fetchPokemon(generation || params?.gen);
    return {
        props: {
            pokemon,
            gen: genId
        },
    };
};

export const getStaticGenerations = async () => {
    const {generations} = await fetchGenerations();

    const paths = generations.map((generation) => ({
        params: {gen: `${generation.id}` },
    }));
    return {
        paths,
        fallback: false,
    };
};
