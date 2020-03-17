import React from 'react';
import Burger from '../../burger/burger';
import DangerButton from '../../ui/buttons/danger-button/danger-button';
import SuccessButton from '../../ui/buttons/success-button/success-button';
import classes from './checkout-summary.module.scss';

const CheckoutSummary = (props: any) => {
    return (
        <div className={classes.checkoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div className={classes.burgerContainer}>
                <Burger ingredients={props.ingredients} />
            </div>
            <DangerButton clicked={props.checkoutCancelled}>CANCEL</DangerButton>
            <SuccessButton clicked={props.checkoutContinued}>CONTINUE</SuccessButton>
        </div>
    )
}

export default CheckoutSummary

