import React, { Component } from 'react';
import axios from '../../../axios-order';
import SuccessButton from '../../../components/ui/buttons/success-button/success-button';
import classes from './contact-data.module.scss';
import Spinner from '../../../components/spinner/spinner';

class ContactData extends Component<any, any> {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event: any) => {
        event?.preventDefault();
        this.setState({ loading: true })
        const order = {
            ingredients: this.props.ingredients,
            price: parseFloat(this.props.price.toFixed(2)),
            customer: {
                name: 'Max',
                address: {
                    street: 'Las Heras',
                    zipCode: '6464',
                    country: 'Argentina'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fatest'
        };
        axios.post('/orders.json', order)
            .then(() => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
                console.log(error)
            });
    }

    render() {
        let form = (<form>
            <input type="text" name="name" placeholder="Your Name" />
            <input type="email" name="email" placeholder="Your Mail" />
            <input type="text" name="street" placeholder="Your Street" />
            <input type="text" name="postal" placeholder="Your Postal Code" />
            <SuccessButton clicked={this.orderHandler}>ORDER</SuccessButton>
        </form>);
        if (this.state.loading) {
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

export default ContactData;
