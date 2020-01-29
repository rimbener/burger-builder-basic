import React from 'react';
import classes from './build-control.module.scss';

const BuildControl = (props: any) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less} onClick={props.removed} disabled={props.disabled}>Menos</button>
        <button className={classes.More} onClick={props.added}>Más</button>
    </div>
);

export default BuildControl;