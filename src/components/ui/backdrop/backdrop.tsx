import React from 'react';
import classes from './backdrop.module.scss';

const Backdrop = (props: any) => (
    props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
);

export default Backdrop;