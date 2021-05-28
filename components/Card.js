import React from "react";
import {colorToRGBA} from "../lib/utils/color-utils";
import classes from "../styles/Card.module.css";

export const Card = (props) => {
    const {pokemon} = props;
    return (
        <div className={classes.card} style={{ backgroundColor: colorToRGBA(pokemon.color, 0.3) }}>
            <div className={classes.figure}>
                <img className={classes.sprite} src={pokemon.sprite} alt={pokemon.name}/>
                <div className={classes.name}>{pokemon.name}</div>
            </div>
            <div>
                {pokemon.types.map((t) => <img className={classes.type} key={t.name} src={t.typeBadgeUrl}
                                               alt={'type'}/>)}
            </div>
        </div>
    );
};
