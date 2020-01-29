import React from 'react';
import DangerButton from '../../ui/buttons/danger-button/danger-button';
import SuccessButton from '../../ui/buttons/success-button/success-button';
import Aux from '../../../hoc/aux/aux';

const OrderSummary = (props: any) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey =>
            <li key={igKey}>
                <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
            </li>
        )
    return (
        <Aux>
            <h3>Su pedido</h3>
            <p>Una deliciosa hamburguesa con los siguientes ingredientes:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Precio: {props.price.toFixed(2)}</strong></p>
            <p>¿Continuar con la compra?</p>
            <DangerButton clicked={props.purchaseCancelled}>Cancelar</DangerButton>
            <SuccessButton clicked={props.purchaseContinued}>Continuar</SuccessButton>
        </Aux >
    )
};

export default OrderSummary;