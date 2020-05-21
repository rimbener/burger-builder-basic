import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../../axios-order';
import Spinner from '../../../components/spinner/spinner';
import SuccessButton from '../../../components/ui/buttons/success-button/success-button';
import Input from '../../../components/ui/input/input';
import withErrorHandler from '../../../hoc/with-error-handler/with-error-handler';
import checkValidity from '../../../shared/check-validity';
import { formElementConfig, inputConfig, isRequired, maxLength, minLength } from '../../../shared/form-element-config';
import * as actions from '../../../store/actions';
import classes from './contact-data.module.scss';

const orderForm: Record<string, any> = {
    name: formElementConfig('input', inputConfig('Your Name'), '', { ...isRequired() }),
    street: formElementConfig('input', inputConfig('Your Street'), '', { ...isRequired() }),
    zipCode: formElementConfig('input', inputConfig('Your PostalCode'), '', { ...isRequired(), ...minLength(4), ...maxLength(6) }),
    country: formElementConfig('input', inputConfig('Your Country'), '', { ...isRequired() }),
    email: formElementConfig('input', inputConfig('Your E-Mail', 'email'), '', { ...isRequired() }),
    deliveryMethod: formElementConfig('select', {
        options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
        ]
    }, 'fastest')
};

class ContactData extends Component<any, any> {
    state = {
        orderForm,
        formIsValid: false
    }

    orderHandler = (event: any) => {
        event.preventDefault();

        const formData: { [key: string]: any } = {};
        for (const elemId in this.state.orderForm) {
            formData[elemId] = this.state.orderForm[elemId].value
        }
        const order = {
            ingredients: this.props.ings,
            price: parseFloat(this.props.price.toFixed(2)),
            order: formData,
            userId: this.props.userId
        };
        this.props.onOrderBurger(order, this.props.token);
    }

    inputChangedHandler = (event: any, id: string) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[id]
        }
        updatedFormElement.value = event.target.value;
        const { isValid, errorMessage } = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.valid = isValid;
        updatedFormElement.errorMessage = errorMessage;
        updatedFormElement.touched = true;
        updatedOrderForm[id] = updatedFormElement;

        let formIsValid = true;
        for (let input in updatedOrderForm) {
            formIsValid = updatedOrderForm[input].valid && formIsValid;
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid });
    }

    render() {
        const formElementsArray = [];
        for (const key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        defaultValue={formElement.config.defaultValue}
                        invalid={Object.keys(formElement.config.validation).length !== 0 && !formElement.config.valid}
                        errorMessage={formElement.config.errorMessage}
                        touched={formElement.config.touched}
                        changed={(event: any) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <SuccessButton disabled={!this.state.formIsValid} clicked={this.orderHandler}>ORDER</SuccessButton>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.contactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onOrderBurger: (orderData: any, token: string) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
