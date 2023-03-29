import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkClearCart, thunkDeleteCart, thunkEditCartItem, thunkLoadCart } from "../../store/cart";
import { useHistory, useParams } from 'react-router-dom'
import './cart.css'

const Cart = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    // console.log('user', user)
    const prehistoricProducts = useSelector(state => state.cartReducer.Cart)
    // console.log('prehistoric prod', prehistoricProducts)
    const cartId = useSelector(state => state.cartReducer.Cart.id)
    // console.log('cartId', cartId)
    const [cartItem, setCartItem] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0.00)
    const [showCheckoutPending, setShowCheckoutPending] = useState(false)

    useEffect(() => {
        if (user) {
            dispatch(thunkLoadCart(user?.id))
        }
        // dispatch(thunkLoadCart(user?.id))
    }, [dispatch, user])

    if (!user) {
        history.push('/login')
    }

    useEffect(() => {
        if (prehistoricProducts?.products) {
          let itemCount = 0
          let price = 0.00
          prehistoricProducts.products?.forEach(({ id, price: itemPrice }) => {
            itemCount += 1
            price += itemPrice
          })
          setCartItem(itemCount)
          setTotalPrice(price)
        }
      }, [prehistoricProducts])

    //   if (!prehistoricProducts) {
    //     return <p>There are no items in your cart</p>
    //   }

    const handleCheckoutPage = async() => {
        try {
            setShowCheckoutPending(true)
            setTimeout(() => {
                dispatch(thunkClearCart(cartId))
                setShowCheckoutPending(false)
                history.push("/")
            }, 2000)
        } catch (error) {
            console.log('Error during checkout', error)
        }
    }

    const handleDeleteItem = (itemId, itemPrice) => {
        // console.log('item', itemId)
        // console.log('itemPrice', itemPrice)
        dispatch(thunkDeleteCart(user.id, itemId))
        setCartItem(prev => prev - 1)
        setTotalPrice(oldPrice => oldPrice - itemPrice)
      }

      const handleQuantityChange = (productId, quantity) => {
        let prevPrice = 0
        let updatedPrice = 0

        prehistoricProducts.products.forEach(product => {
            let productPrice = product.price
            let productQuantity = product.quantity
            // console.log('productQuantity', productQuantity)
            if (product.id === productId) {
                prevPrice = productPrice * productQuantity
                updatedPrice = productPrice * parseInt(quantity)
            }
        });
        setTotalPrice((old) => old - prevPrice + updatedPrice)
        // console.log('quantity', quantity)
        dispatch(thunkEditCartItem(user.id, productId, parseInt(quantity)))
      }

      if (cartItem === 0) {
        return <p>You have no items in your cart</p>
      }

      if (!user) {
        return (
            <div>
                <h1>Sign in to use cart</h1>
            </div>
        )
      }
    return (
        <div>
            <h1>({cartItem})</h1>
                <div className="cart-product-container">
                    {prehistoricProducts?.products && prehistoricProducts.products?.map(({id, name, image_url, price, size, quantity}) => {
                        return (
                            <div key={id}>
                                <h2 className="name">{name}</h2>
                                <img src={image_url} className='product-image'></img>
                                <p className="price">${price}</p>
                                <select id={`quantity-${id}`}
                                    value={quantity}
                                    onChange={(e) => handleQuantityChange(id, e.target.value)}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                                <button className="delete-cart-button" onClick={() => handleDeleteItem(id, price)}>Delete Item</button>
                            </div>
                        )
                    })}
                </div>
            <div>
                <p className="total-price">Total Price: ${totalPrice.toFixed(2)}</p>
            </div>
            <div>
                <button className="checkout-button" onClick={() => handleCheckoutPage(totalPrice, setShowCheckoutPending)}>Checkout</button>
            </div>
            {showCheckoutPending && <p>Your order is being processed, check again later</p>}
        </div>
    )
}

export default Cart
