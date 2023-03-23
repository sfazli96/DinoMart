const LOAD_PREHISTORIC_PRODUCTS = 'product/loadPrehistoricProducts'
const LOAD_ONE_PREHISTORIC_PRODUCT = 'product/loadOnePrehistoricProduct'

const loadProduct = (products) => ({
    type: LOAD_PREHISTORIC_PRODUCTS,
    payload: products
})

const singleProduct = (product) => ({
    type: LOAD_ONE_PREHISTORIC_PRODUCT,
    payload: product
})


export const loadAnimalProduct = () => async (dispatch) => {
    const response = await fetch('/api/products/')
    const data = await response.json()
    dispatch(loadProduct(data))
    return response
}

export const loadOnePrehistoricProduct = (id) => async (dispatch) => {
    const response = await fetch(`/api/products/${id}`)
    const data = await response.json()

    dispatch(singleProduct(data))
    return response
}



const initialState = {
    allProducts: {},
    singleProduct: {}
}

export const productsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case LOAD_PREHISTORIC_PRODUCTS:
            newState = {...state}
            let allProductsCopy = {}
            action.payload.products.forEach(product => {
                allProductsCopy[product.id] = product
            });
            newState.allProducts = allProductsCopy
            return newState
        case LOAD_ONE_PREHISTORIC_PRODUCT:
            newState = {...state}
            newState.singleProduct = action.payload
            return newState
        default:
            return state
    }
}

export default productsReducer
