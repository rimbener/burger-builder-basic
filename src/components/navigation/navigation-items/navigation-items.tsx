import React from 'react'
import classes from './navigation-items.module.scss';
import NavigationItem from './navigation-item/navigation-item';

const NavigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>Burger builder</NavigationItem>
        <NavigationItem link="/">Checkout</NavigationItem>
    </ul>
)

export default NavigationItems;