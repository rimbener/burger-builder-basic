import * as actionTypes from '../actions/action-types';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseInit = (state: any) => ({
    ...state,
    purchased: false
});

const purchaseBurgerStart = (state: any) => ({
    ...state,
    loading: true
});

const purchaseBurgerSuccess = (state: any, action: any) => {
    const newOrder = {
        ...action.orderData,
        id: action.orderId
    }
    return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    }
};

const purchaseBurgerFail = (state: any) => ({
    ...state,
    loading: false

});

const fetchOrdersStart = (state: any) => ({
    ...state,
    loading: true

});

const fetchOrderSuccess = (state: any, action: any) => ({
    ...state,
    loading: false,
    orders: action.orders
});

const fetchOrdersFail = (state: any) => ({
    ...state,
    loading: false
});

const orderReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return purchaseInit(state);

        case actionTypes.PURCHASE_BURGER_START:
            return purchaseBurgerStart(state);

        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccess(state, action);

        case actionTypes.PURCHASE_BURGER_FAIL:
            return purchaseBurgerFail(state);

        case actionTypes.FETCH_ORDERS_START:
            return fetchOrdersStart(state);

        case actionTypes.FETCH_ORDERS_SUCCESS:
            return fetchOrderSuccess(state, action);

        case actionTypes.FETCH_ORDERS_FAIL:
            return fetchOrdersFail(state);

        default:
            return state;
    }
}

export default orderReducer;