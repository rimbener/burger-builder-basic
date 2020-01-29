import React from 'react'
import classes from './button.module.scss';

const Button = (props: any) => (
    <button
        className={[classes.Button, props.classes].join(' ')}
        onClick={props.clicked}>{props.children}
    </button>
)

export default Button
