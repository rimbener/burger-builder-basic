import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/order/checkout-summary/checkout-summary';
import ContactData from './contact-data/contact-data';
import { connect } from 'react-redux';

export class Checkout extends Component<any, any> {
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData}
                />
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        ings: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);
