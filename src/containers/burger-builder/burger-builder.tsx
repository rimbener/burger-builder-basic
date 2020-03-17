import React, { Component } from 'react';
import axios from '../../axios-order';
import BuildControls from '../../components/burger/build-controls/build-controls';
import Burger from '../../components/burger/burger';
import OrderSummary from '../../components/burger/order-summary/order-summary';
import Spinner from '../../components/spinner/spinner';
import Modal from '../../components/ui/modal/modal';
import Aux from '../../hoc/aux/aux';
import withErrorHandler from '../../hoc/with-error-handler/with-error-handler';

const INGREDIENT_PRICES: Record<string, any> = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

let ingredients: Record<string, any>;

class BurgerBuilder extends Component<any, any> {
    state = {
        ingredients: ingredients,
        totalPrice: 4,
        purchaseable: true,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://react-my-burger-hel.firebaseio.com/ingredients.json')
            .then(response => this.setState({ ingredients: response.data }))
            .catch(error => this.setState({ error: true }));
    }

    updatePurchaseState(ingredients: any) {
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum, el) => { return sum + el }, 0);
        this.setState({ purchaseable: sum > 0 });
    }

    addIngredientHandler = (type: string) => {
        const oldCount = this.state.ingredients[type];
        const updatedCounted = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCounted;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type: string) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCounted = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCounted;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for (const ing in this.state.ingredients) {
            queryParams.push(encodeURIComponent(ing) + '=' + encodeURIComponent(this.state.ingredients[ing]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryParams.join('&')
        })
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        };

        let orderSummary = null;

        let burger = this.state.error ? <p>No se pudieron cargar los ingredientes</p> : <Spinner />

        if (this.state.ingredients) {
            burger = <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchaseHandler}
                />
            </Aux>
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);