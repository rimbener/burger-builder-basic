import React from 'react'
import Button from '../button/button';
import classes from './danger-button.module.scss';

const DangerButton = (props: any) => {
    const newProps = {
        classes: classes.Danger,
        ...props
    }
    return (
        <Button {...newProps}>{props.children}</Button>
    )
};

export default DangerButton;
