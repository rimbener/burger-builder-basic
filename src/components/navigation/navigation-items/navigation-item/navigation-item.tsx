import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './navigation-item.module.scss';

const NavigationItem = (props: any) => (
    <li className={classes.NavigationItem}>
        <NavLink exact={props.exact} to={props.link} activeClassName={classes.active}>
            {props.children}
        </NavLink>
    </li>
)

export default NavigationItem;
