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


    useEffect(() => {
        dispatch(thunkLoadCart(user?.id))
    }, [dispatch])

    return (
        <h1>TEST</h1>
    )
}

export default Cart
