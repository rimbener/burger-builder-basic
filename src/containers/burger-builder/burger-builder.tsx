import React, { Component } from 'react';
import axios from '../../axios-order';
import BuildControls from '../../components/burger/build-controls/build-controls';
import Burger from '../../components/burger/burger';
import OrderSummary from '../../components/burger/order-summary/order-summary';
import Spinner from '../../components/spinner/spinner';
import Modal from '../../components/ui/modal/modal';
import Aux from '../../hoc/aux/aux';
import withErrorHandler from '../../hoc/with-error-handler/with-error-handler';
import { ADD_INGREDIENT, REMOVE_INGREDIENT } from '../../store/actions';
import { connect } from 'react-redux';

class BurgerBuilder extends Component<any, any> {
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
/*        axios.get('https://react-my-burger-hel.firebaseio.com/ingredients.json')
            .then(response => this.setState({ ingredients: response.data }))
            .catch(error => this.setState({ error: true }));
    */    }

    updatePurchaseState(ingredients: any) {
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum, el) => { return sum + el }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        };

        let orderSummary = null;

        let burger = this.state.error ? <p>No se pudieron cargar los ingredientes</p> : <Spinner />

        if (this.props.ings) {
            burger = <Aux>
                <Burger ingredients={this.props.ings} />
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    price={this.props.price}
                    purchaseable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler}
                />
            </Aux>
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
            />
        };

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onIngredientAdded: (ingName: string) => dispatch({ type: ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName: string) => dispatch({ type: REMOVE_INGREDIENT, ingredientName: ingName })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));