import { BurgerBuilderState } from "../../types/burger-builder-state";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
interface SendIngredientAction {
    type: typeof ADD_INGREDIENT
    payload: BurgerBuilderState
}

export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
interface RemoveIngredientAction {
    type: typeof REMOVE_INGREDIENT
    payload: BurgerBuilderState
}

export const SET_INGREDIENTS = 'SET_INGREDIENTS';
interface SetIngredientsAction {
    type: typeof SET_INGREDIENTS
    payload: BurgerBuilderState
}

export const FETCH_INGREDIENTS_FAILED = 'FETCH_INGREDIENTS_FAILED';
interface FetchIngredientsFailedAction {
    type: typeof FETCH_INGREDIENTS_FAILED
}

export const PURCHASE_BURGER_SUCCESS = 'PURCHASE_BURGER_SUCCESS';
interface PurchaseBurgerFailAction {
    type: typeof PURCHASE_BURGER_FAIL
}

export const PURCHASE_BURGER_FAIL = 'PURCHASE_BURGER_FAIL';
interface PurchaseBurgerSuccessAction {
    type: typeof PURCHASE_BURGER_SUCCESS
}

export const PURCHASE_BURGER_START = 'PURCHASE_BURGER_START';
interface PurchaseBurgerStartAction {
    type: typeof PURCHASE_BURGER_START
}

export const PURCHASE_INIT = 'PURCHASE_INIT';
interface PurchaseInitAction {
    type: typeof PURCHASE_INIT
}

export const FETCH_ORDERS_FAIL = 'FETCH_ORDERS_FAIL';
interface FetchOrdersFailAction {
    type: typeof PURCHASE_BURGER_FAIL
}

export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
interface FetchOrdersSuccessAction {
    type: typeof PURCHASE_BURGER_SUCCESS
}

export const FETCH_ORDERS_START = 'FETCH_ORDERS_START';
interface FetchOrdersStartAction {
    type: typeof PURCHASE_BURGER_START
}

export const AUTH_START = 'AUTH_START';
interface AuthStartAction {
    type: typeof AUTH_START
}

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
interface AuthSuccessAction {
    type: typeof AUTH_SUCCESS
}

export const AUTH_FAIL = 'AUTH_FAIL';
interface AuthFailAction {
    type: typeof AUTH_FAIL
}

export const AUTH_LOGOUT = 'AUTH_LOGOUT';
interface AuthLogoutAction {
    type: typeof AUTH_LOGOUT
}

export const SET_AUTH_REDIRECT_PATH = 'SET_AUTH_REDIRECT_PATH';
interface SetAuthRedirectPath {
    type: typeof SET_AUTH_REDIRECT_PATH
}

export type actionTypes =
    SendIngredientAction |
    RemoveIngredientAction |
    SetIngredientsAction |
    FetchIngredientsFailedAction |
    PurchaseInitAction |
    PurchaseBurgerStartAction |
    PurchaseBurgerFailAction |
    PurchaseBurgerSuccessAction |
    FetchOrdersStartAction |
    FetchOrdersFailAction |
    FetchOrdersSuccessAction |
    AuthStartAction |
    AuthFailAction |
    AuthSuccessAction |
    AuthLogoutAction |
    SetAuthRedirectPath;