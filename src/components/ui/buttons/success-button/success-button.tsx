import React from 'react'
import Button from '../button/button';
import classes from './success-button.module.scss';

const SuccessButton = (props: any) => (
    <Button classes={classes.Success} clicked={props.clicked}>{props.children}</Button>
)

export default SuccessButton;
