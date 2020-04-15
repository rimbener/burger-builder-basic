import React from 'react';
import classes from './input.module.scss';

const Input = (props: any) => {
    let inputElement = null;
    const inputClasses = [classes.inputElement];
    let validationError = null;
    if (props.invalid && props.touched) {
        inputClasses.push(classes.invalid);
        validationError = <p className={classes.validationError}>{props.errorMessage}</p>;
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                onChange={props.changed}
                className={inputClasses.join(' ')}
                {...props.elementConfig} value={props.value}
            />
            break;
        case ('textarea'):
            inputElement = <textarea
                onChange={props.changed}
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
            />
            break;
        case ('select'):
            inputElement =
                <select
                    onChange={props.changed}
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}>
                    {props.elementConfig.options.map((option: any) => (
                        <option value={option.value} key={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            break;
        default:
            inputElement = <input className={classes.inputElement} {...props.elementConfig} value={props.value} />
    }
    return (
        <div className={classes.input}>
            <label className={classes.label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
}

export default Input
