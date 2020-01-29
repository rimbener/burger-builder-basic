import React from 'react'
import classes from './drawer-toggle.module.scss';

const DrawerToggle = (props: any) => (
    <div onClick={props.clicked} className={classes.DrawerToggle}>
        <div></div>
        <div></div>
        <div></div>
    </div>
)


export default DrawerToggle;
