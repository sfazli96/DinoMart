import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadCart } from "../store/cart";


const Cart = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    console.log('user', user)
    const prehistoricProducts = useSelector(state => state.cart.cartReducer)
    console.log('prehistoric prod', prehistoricProducts)
    const cartId = useSelector(state => state.cart.cartReducer)

    console.log('cartId', cartId)

    useEffect(() => {
        dispatch(thunkLoadCart(user.id))
    }, [dispatch])

    return (
        <div>
            <h1>TEST</h1>
            {prehistoricProducts.products.map(({description, id, name, image_url, price, size}) => {
                return (
                    <div key={id}>
                        <h2>{name}</h2>
                    </div>
                )
            })}
            <div>
                <button className="checkoutbutton">CheckOut</button>
            </div>
        </div>
    )
}

export default Cart
