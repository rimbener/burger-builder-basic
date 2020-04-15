import React from 'react'
import Button from '../button/button';
import classes from './success-button.module.scss';

const SuccessButton = (props: any) => {
    const newProps = {
        classes: classes.Success,
        ...props
    }
    return (
        <Button {...newProps}>{props.children}</Button>
    )
};

export default SuccessButton;
