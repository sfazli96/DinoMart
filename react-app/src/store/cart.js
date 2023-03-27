const LOAD_CART = 'cart/showCart'
const CREATE_CART = 'cart/createCart'
const ADD_TO_CART = 'cart/addToCart'
const CLEAR_CART = 'cart/emptyCart'
const EDIT_CART = 'cart/editCart'
const DELETE_CART_ITEM = 'cart/deleteCart'

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
    payload: item,
})

const editCartItem = (item) => ({
    type: EDIT_CART,
    payload: item
})

export const thunkLoadCart = (id) => async (dispatch) => {
    const res = await fetch(`/api/cart/${id}`)
    if (res.ok) {
        const loadData = await res.json()
        console.log('load data', loadData)
        dispatch(loadCart(loadData))
        return loadData
    }
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


export const thunkAddToCart = (cartId, productId) => async (dispatch) => {
    // console.log('cartID', cartId)
    // console.log('productId', productId)
    const res = await fetch(`/api/cart/${cartId}/product/${productId}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({cartId: cartId, productId: productId})
    })
    if (res.ok) {
        const cartData = await res.json()
        // console.log('AddToCart', cartData)
        dispatch(addToCart(cartData.cart))
        return cartData
    }
    return res.json()
}

export const thunkDeleteCart = (userId, product_id) => async (dispatch) => {
    // console.log('userId---', userId)
    // console.log('productId---', product_id)
    const res = await fetch(`/api/cart/${userId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({product_id})
    })
    if (res.ok) {
        const cartData = await res.json()
        // console.log('cartData', cartData)
        dispatch(deleteCart(cartData))
        return cartData
    }
    return res.json()
}

export const thunkClearCart = (id) => async (dispatch) => {
    // console.log('id', id)
    const res = await fetch('/api/cart/emptycart', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(id)
    })
    console.log('res', res)
    if (res.ok) {
        const cartData = await res.json()
        // console.log('clear cartData', cartData)
        dispatch(clearCart(cartData))
        return cartData
    }
    return res
}

export const thunkEditCartItem = (product) => async (dispatch) => {
    const res = await fetch('/api/cart', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    })
    if (res.ok) {
        const cartData = await res.json()
        console.log('edit product cart', cartData)
        dispatch(editCartItem(cartData))
        return cartData
    }
}





// let initialState = {
//     Cart: {},
// }

export const cartReducer = (state = {Cart: {}}, action) => {
    let newState;
    switch(action.type){
        case LOAD_CART:
            newState = {...state}
            // console.log('action2', action.payload)
            action.payload.cart.forEach(element => {
                newState.Cart = element
            });
            return newState
            //     ...state,
            // return {
            //     Cart: action.payload.products
            // }
            // newState = {...state, Cart: action.payload.products.map((item) => item)}
            // return newState
        case ADD_TO_CART:
            newState = {...state}
            // console.log('newState', state)
            let copy = {...newState.Cart}
            // console.log('ACTION', action.payload)
            copy[action.payload.id] = action.payload
            // console.log('COPY', copy)
            // console.log('ACTION----', action.payload)
            newState.Cart = copy
            // console.log('NEW', newState.Cart)
            return newState
        case CREATE_CART:
            newState = {...state}
            let copy2 = {...newState.Cart}
            copy2[action.payload.id] = action.payload
            newState.Cart = copy2
            return newState
        case DELETE_CART_ITEM:
            // console.log('ACTION', action.payload)
            newState = {...state}
            newState.Cart = action.payload
            return newState
        // case EDIT_CART:
        //     const updatedCart = {...state.Cart[action.payload.id], quantity: action.cart.quantity}
        //     return {...state, cart: {...state.Cart, [action.payload.id]: updatedCart}}
        case CLEAR_CART:
            // console.log('state', state)
            return {
                ...state,
                Cart: {}
            }
        default:
            newState = {...state}
            return newState
    }
}
