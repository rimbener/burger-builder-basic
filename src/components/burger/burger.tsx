import React from 'react'
import classes from './burger.module.scss';
import BurgerIngredient from './burger-ingredient/burger-ingredient';

export const Burger = (props: any) => {
    let transformedIngredients: any = Object.keys(props.ingredients)
        .map(igKey => [...Array(props.ingredients[igKey])]
            .map((_, i) =>
                <BurgerIngredient key={igKey + i} type={igKey} />
            )
        )
        .reduce((arr, el) => arr.concat(el), []);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Por favor añada ingredientes</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default Burger;