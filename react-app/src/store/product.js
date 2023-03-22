const NEW_PRODUCT = 'product/newProduct'
const LOAD_PRODUCTS = 'product/loadProducts'
const LOAD_ONE_PRODUCT = 'product/loadOneProduct'

const loadProduct = (products) => ({
    type: LOAD_PRODUCTS,
    payload: products
})

const singleProduct = (product) => ({
    type: LOAD_ONE_PRODUCT,
    payload: product
})

