import { BurgerBuilderState } from '../../types/burger-builder-state';
import * as actionTypes from '../actions/action-types';

const INGREDIENT_PRICES: Record<string, any> = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const INITIAL_INGREDIENTS: Record<string, any> = {
    salad: 0,
    cheese: 0,
    meat: 0,
    bacon: 0
}

const initialState: BurgerBuilderState = {
    ingredients: INITIAL_INGREDIENTS,
    totalPrice: 4,
    error: false
}

const addIngredient = (state: any, action: any) => ({
    ...state,
    ingredients: {
        ...state.ingredients,
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    },
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
})

const removeIngredient = (state: any, action: any) => ({
    ...state,
    ingredients: {
        ...state.ingredients,
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    },
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
})

const setIngredients = (state: any, action: any) => ({
    ...state,
    ingredients: {
        salad: action.ingredients.salad,
        bacon: action.ingredients.bacon,
        cheese: action.ingredients.cheese,
        meat: action.ingredients.meat,
    },
    totalPrice: 4,
    error: false
})

const fetchIngredientsFailed = (state: any) => ({
    ...state,
    error: true
})

const burgerBuilderReducer = (state = initialState, action: any): BurgerBuilderState => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS:
            return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return fetchIngredientsFailed(state)
        default:
            return state;
    }
}

export default burgerBuilderReducer;