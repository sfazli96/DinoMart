import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadCart } from "../../store/cart";


const Cart = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    // console.log('user', user)
    const prehistoricProducts = useSelector(state => state.cartReducer.Cart)
    console.log('prehistoric prod', prehistoricProducts)
    const cartId = useSelector(state => state.cartReducer.Cart?.id)
    // console.log('cartId', cartId)
    const [cartItem, setCartItem] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0.00)

    useEffect(() => {
        dispatch(thunkLoadCart(user?.id))
    }, [dispatch])

    useEffect(() => {
        if (prehistoricProducts) {
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


    return (
        <div>
            <h1>({cartItem})</h1>
            {prehistoricProducts?.products.map(({id, name, image_url, price, size}) => {
                return (
                    <div key={id}>
                        <h2>{name}</h2>
                        <img src={image_url}></img>
                        <p>{price}</p>
                    </div>
                )
            })}
            <div>
                <p>Total Price: {totalPrice.toFixed(2)}</p>
            </div>
            <div>
                <button className="checkout-button">Checkout</button>
            </div>
        </div>
    )
}

export default Cart
