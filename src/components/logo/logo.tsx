import React from 'react'
import classes from './logo.module.scss';
import burgerLogo from '../../assets/images/burger-logo.png';

const Logo = () => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="Mi hamburguesa" />
    </div>
)

export default Logo;