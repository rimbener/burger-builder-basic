import React from 'react';
import classes from './order.module.scss';

const Order = (props: any) => {
    const ingredients = [];
    for (let ingName in props.ingredients) {
        ingredients.push({
            name: ingName,
            amount: props.ingredients[ingName]
        })
    }
    const ingredientOutput = ingredients.map(ig => <span className={classes.ingredients} key={ig.name}>{ig.name} {ig.amount}</span>)

    return (
        <div className={classes.order}>
            {ingredientOutput}
            <p>Price: <strong>{props.price}</strong></p>
        </div>
    )
}

export default Order
