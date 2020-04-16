import { BurgerBuilderState } from '../types/burger-builder-state';
import { ADD_INGREDIENT, REMOVE_INGREDIENT } from './actions';

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
    totalPrice: 0
}

function reducer(state = initialState, action: any): BurgerBuilderState {
    switch (action.type) {
        case ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }

        case REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
    }
    return state;
}

export default reducer;