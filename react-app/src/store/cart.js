const LOAD_CART = 'cart/showCart'
const CREATE_CART = 'cart/createCart'
const ADD_TO_CART = 'cart/addCart'
const CLEAR_CART = 'cart/updateCart'
const EDIT_CART = 'cart/editCart'
const DELETE_CART_ITEM = 'cart/deleteCartItem'

const loadCart = (cart) => ({
    type: LOAD_CART,
    payload: cart
})

const createCart = (cart) => ({
    type: CREATE_CART,
    payload: cart
})

const addToCart = (item) => ({
    type: ADD_TO_CART,
    payload: item
})

const clearCart = (cart) => ({
    type: CLEAR_CART,
    payload: cart
})

const deleteCart = (item) => ({
    type: DELETE_CART_ITEM,
    payload: item
})



export const thunkCreateCart = (userId) => async (dispatch) => {
    const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userId)
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(createCart(data))
    }
    return response
}





















let initialState = {
    Cart: {},
}

export const cartReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        default:
            newState = {...state}
            return newState
    }
}
