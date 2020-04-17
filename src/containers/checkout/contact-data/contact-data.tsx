import React, { Component } from 'react';
import axios from '../../../axios-order';
import SuccessButton from '../../../components/ui/buttons/success-button/success-button';
import classes from './contact-data.module.scss';
import Spinner from '../../../components/spinner/spinner';
import Input from '../../../components/ui/input/input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/with-error-handler/with-error-handler';
import * as actions from '../../../store/actions';

const formElementConfig = (elementType: string, elementConfig: any, defaultValue: string, validationConfig?: any) => {
    const validity = validationConfig === undefined ? true : false;
    return {
        elementType,
        elementConfig,
        defaultValue,
        validation: {
            ...validationConfig,
        },
        value: defaultValue,
        valid: validity,
        touched: false
    }
}
const inputElementConfig = (placeholder: string, type = 'text') => {
    return {
        type,
        placeholder
    }
}
const requiredElementConfig = () => {
    return {
        required: true
    }
}
const minLengthElementConfig = (min: number) => {
    return {
        minLength: min
    }
}
const maxLengthElementConfig = (max: number) => {
    return {
        maxLength: max,
    }
}

const orderForm: Record<string, any> = {
    name: formElementConfig('input', inputElementConfig('Your Name'), '', { ...requiredElementConfig() }),
    street: formElementConfig('input', inputElementConfig('Your Street'), '', { ...requiredElementConfig() }),
    zipCode: formElementConfig('input', inputElementConfig('Your PostalCode'), '', { ...requiredElementConfig(), ...minLengthElementConfig(4), ...maxLengthElementConfig(6) }),
    country: formElementConfig('input', inputElementConfig('Your Country'), '', { ...requiredElementConfig() }),
    email: formElementConfig('input', inputElementConfig('Your E-Mail', 'email'), '', { ...requiredElementConfig() }),
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
            order: formData
        };
        this.props.onOrderBurger(order);
    }

    inputChangedHandler = (event: any, id: string) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[id]
        }
        updatedFormElement.value = event.target.value;
        const { isValid, errorMessage } = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
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

    checkValidity(value: string, rules: any) {
        let isValid = true;
        let errorMessage = null;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
            if (!isValid) {
                errorMessage = 'This field is required';
            }
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
            if (!isValid) {
                errorMessage = 'The min length for this field is: ' + rules.minLength.toString();
                return { isValid, errorMessage };
            }
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
            if (!isValid) {
                errorMessage = 'The max length for this field is: ' + rules.maxLength.toString();
                return { isValid, errorMessage };
            }
        }

        return { isValid, errorMessage };
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
        loading: state.order.loading
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onOrderBurger: (orderData: any) => dispatch(actions.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
