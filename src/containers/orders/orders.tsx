import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-order';
import Order from '../../components/order/order';
import Spinner from '../../components/spinner/spinner';
import withErrorHandler from '../../hoc/with-error-handler/with-error-handler';
import * as actions from '../../store/actions';
import classes from './orders.module.scss';

class Orders extends Component<any, any>  {
    state = {
        orders: []
    }

    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }
    render() {
        let orders = <Spinner />;
        if (!this.props.loading) {
            orders = this.props.orders.map((order: any) => (
                <Order key={order.id} ingredients={order.ingredients} price={order.price} />
            ));
        }
        return (
            <div className={classes.orders}>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        onFetchOrders: (token: string, userId: string) => dispatch(actions.fetchOrders(token, userId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));