import React, { Component } from 'react';
import Order from '../../../components/order/order';
import classes from './orders.module.scss';
import axios from '../../../axios-order';
import withErrorHandler from '../../../hoc/with-error-handler/with-error-handler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({ id: key, ...res.data[key] });
                }
                this.setState({ orders: fetchedOrders, loading: false });
            })
            .catch(error => {
                console.log(error);
                this.setState({ loading: false });
            })
    }
    render() {
        return (
            <div className={classes.orders}>
                {this.state.orders.map((order: any) => (
                    <Order key={order.id} ingredients={order.ingredients} price={order.price} />
                ))}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios);