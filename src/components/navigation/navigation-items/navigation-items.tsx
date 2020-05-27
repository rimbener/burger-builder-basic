import React from 'react'
import classes from './navigation-items.module.scss';
import NavigationItem from './navigation-item/navigation-item';

const NavigationItems = (props: any) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burger builder</NavigationItem>
        {
            props.isAuthenticated
                ? <NavigationItem link="/orders">Orders</NavigationItem>
                : null
        }
        { 
            props.isAuthenticated
                ? <NavigationItem link="/logout">Logout</NavigationItem>
                : <NavigationItem link="/auth">Authenticate</NavigationItem>
        }
    </ul>
)

export default NavigationItems;