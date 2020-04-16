import { BurgerBuilderState } from "../types/burger-builder-state";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';

interface SendIngredientAction {
    type: typeof ADD_INGREDIENT
    payload: BurgerBuilderState
}

interface RemoveIngredientAction {
    type: typeof REMOVE_INGREDIENT
    payload: BurgerBuilderState
}

export type actionTypes = SendIngredientAction | RemoveIngredientAction;