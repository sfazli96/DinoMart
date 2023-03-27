import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkClearCart, thunkLoadCart } from "../../store/cart";
import { useHistory } from 'react-router-dom'
import './cart.css'

const Cart = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    // console.log('user', user)
    const prehistoricProducts = useSelector(state => state.cartReducer.Cart)
    // const prehistoricProducts = useSelector(state => state.cartReducer.Cart)
    console.log('prehistoric prod', prehistoricProducts)
    const [cartItem, setCartItem] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0.00)
    const [showCheckoutPending, setShowCheckoutPending] = useState(false)

    useEffect(() => {
        dispatch(thunkLoadCart(user?.id))
    }, [dispatch])

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


    const handleCheckoutPage = async() => {
        setShowCheckoutPending(true)
        setTimeout(() => {
            dispatch(thunkClearCart())
            setShowCheckoutPending(false)
            history.push("/")
        }, 2000)
    }


    return (
        <div>
            <h1>({cartItem})</h1>
                <div className="cart-product-container">
                    {prehistoricProducts?.products && prehistoricProducts.products.map(({id, name, image_url, price, size}) => {
                        return (
                            <div key={id}>
                                <h2>{name}</h2>
                                <img src={image_url}></img>
                                <p>${price}</p>
                            </div>
                        )
                    })}
                </div>
            <div>
                <p>Total Price: ${totalPrice.toFixed(2)}</p>
            </div>
            <div>
                <button className="checkout-button" onClick={() => handleCheckoutPage(totalPrice, setShowCheckoutPending)}>Checkout</button>
            </div>
            {showCheckoutPending && <p>Your order is being processed, check again later</p>}
        </div>
    )
}

export default Cart
