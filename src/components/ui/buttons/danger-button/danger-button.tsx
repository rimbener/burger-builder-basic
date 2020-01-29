import React from 'react'
import Button from '../button/button';
import classes from './danger-button.module.scss';

const DangerButton = (props: any) => (
    <Button classes={classes.Danger} clicked={props.clicked}>{props.children}</Button>
)

export default DangerButton;
