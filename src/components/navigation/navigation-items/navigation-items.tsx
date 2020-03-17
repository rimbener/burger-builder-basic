import React from 'react'
import classes from './navigation-items.module.scss';
import NavigationItem from './navigation-item/navigation-item';

const NavigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burger builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
)

export default NavigationItems;