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
    const [quantity, setQuantity] = useState(1)
    const [quantities, setQuantities] = useState(1);
    // console.log('quantity test', quantities)

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
          // let price = 0.00
          let newTotalPrice = 0.00
          // let newTotalPrice = totalPrice
          prehistoricProducts.products?.forEach(({ id, price: itemPrice }) => {
            itemCount += 1
            // price += itemPrice
            // console.log('id', id)
            // console.log('itemPrice', itemPrice)
            const productQuantity = quantities[id] || 1;
            // console.log('quantity', quantity)
            // console.log('quantities', quantities)
            // console.log('productQuantity', productQuantity)
            newTotalPrice += itemPrice * productQuantity;
            // console.log('newTotalPrice', newTotalPrice)
      })
      setCartItem(itemCount)
      setTotalPrice(newTotalPrice);
          // setTotalPrice(price)
        }
      }, [quantities, prehistoricProducts])

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
        const quantity = quantities[itemId] || 1;

        dispatch(thunkDeleteCart(user.id, itemId));

        setCartItem(prev => prev - quantity);
        setQuantities(prevQuantities => ({
          ...prevQuantities,
          [itemId]: 0,

        }));

        // const newTotalPrice = totalPrice - itemPrice * quantity

        // const updatedTotalPrice = prehistoricProducts.products.reduce(
        //   (acc, product) => {
        //     const productQuantity = quantities[product.id] || 0;
        //     return acc + product.price * productQuantity;
        //   },
        //   newTotalPrice
        // );

        // setTotalPrice(updatedTotalPrice);
      };
      // useEffect(() => {
      //   let newTotalPrice = 0;
      //   prehistoricProducts.products?.forEach(product => {
      //     const productQuantity = quantities[product.id] || 0;
      //     newTotalPrice += product.price * productQuantity;

      //   });
      //   console.log('newTotalPrice', newTotalPrice)
      //   setTotalPrice(newTotalPrice);
      // }, [cartItem, quantities, prehistoricProducts])



      const handleQuantityChange = (productId, newQuantity) => {
        // console.log(productId)
        // console.log('newQuantity', newQuantity)
        const updatedQuantities = {
          ...quantities,
          [productId]: parseInt(newQuantity),
        };
        setQuantities(updatedQuantities);

        const newTotalPrice = prehistoricProducts.products.reduce(
          (acc, product) => {
            const quantity = updatedQuantities[product.id] || 1;
            // console.log('quantity', quantity)
            return acc + product.price * quantity;
          },
          0
        );
        setTotalPrice(newTotalPrice);
      };






      if (cartItem === 0) {
        return (
          <div className="empty-cart">
            <p className="empty-cart-message">Oops, your cart is empty! Time to go shopping.</p>
            <img className="image-gif" src="https://cdn.dribbble.com/users/5107895/screenshots/14532312/media/a7e6c2e9333d0989e3a54c95dd8321d7.gif" alt="Empty cart" />
          </div>
        );
      }

      if (!user) {
        return (
            <div>
                <h1>Sign in to use cart</h1>
            </div>
        )
      }
    return (
        <div className="root-cart-container">
            <h1>({cartItem})</h1>
                <div className="cart-product-container">
                    {prehistoricProducts?.products && prehistoricProducts.products?.map(({id, name, image_url, price, size}) => {
                        // let sub = price * quantity
                        // let subTotal = parseInt(sub)
                        const quantity = quantities[id] || 1;
                        const subTotal = parseInt(price * quantity);
                        return (
                            <div key={id}>
                                <h2 className="name">{name}</h2>
                                <img src={image_url} className='product-image'></img>
                                <p className="price">${price}</p>
                                <div className="quantity-dropdown">
                                  <select id={`quantity-${id}`}
                                      value={quantity}
                                      onChange={(e) => handleQuantityChange(id, e.target.value)}>
                                      {/* // onChange={(e) => setQuantity(e.target.value)} */}
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                      <option value="5">5</option>
                                  </select>
                                </div>
                                <button className="delete-cart-button" onClick={() => handleDeleteItem(id, price)}>Delete Item</button>
                                <p className="sub-total-price">SubTotal: ${subTotal.toFixed(2)}</p>
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
