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

export const thunkLoadCart = (id) => async (dispatch) => {
    const res = await fetch(`/api/cart/${id}`)
    if (res.ok) {
        const loadData = await res.json()
        console.log('load data', loadData)
        dispatch(loadCart(loadData))
    }
    return res
}

export const thunkCreateCart = (userId) => async (dispatch) => {
    const res = await fetch('/api/cart', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userId)
    })
    if (res.ok) {
        const data = await res.json()
        console.log('DATA', data)
        dispatch(createCart(data))
    }
    return res
}


export const thunkAddToCart = (id, productId) => async (dispatch) => {
    const res = await fetch(`/api/cart/${id}/product/${productId}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (res.ok) {
        const cartData = await res.json()
        console.log('AddToCart', cartData)
        dispatch(addToCart(cartData))
    }
    return res
}




let initialState = {
    Cart: {},
}

export const cartReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case LOAD_CART:
            newState = {...state}
            action.payload.products.forEach(element => {
                newState.Cart = element
            });
            return newState
            // return {
            //     ...state,
            //     Cart: action.payload.products
            // }
            // newState = {...state, Cart: action.payload.products.map((item) => item)}
            // return newState
        case ADD_TO_CART:
            newState = {...state}
            let copy = {...newState.Cart}
            copy[action.payload.id] = action.payload
            newState.Cart = copy
            return newState
        default:
            newState = {...state}
            return newState
    }
}
