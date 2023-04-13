import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { NavLink, Switch, Route } from 'react-router-dom'
import { useParams } from "react-router-dom";
import { useHistory } from 'react-router-dom'
import { readFavorites, removeFavorites } from '../../store/favorite';
import { thunkAddToCart } from '../../store/cart';
import './myFavorite.css'


function UserFavorites() {
    const {user_id} = useParams()
    const user = useSelector(state => state.session.user);
    const favoriteDetail = useSelector(state => state.favoriteReducer?.favorites || [] || {});
    // console.log('booking---', booking)
    const favoriteObj = Object.values(favoriteDetail)
    const dispatch = useDispatch();


    useEffect(() => {
        if (user) {
          dispatch(readFavorites(user.id))
          };
      }, [dispatch, user]);

    if (!favoriteDetail) {
        return null
    }

    if (!user) {
        return (
            <div>
                <h1>Sign in to see your favorites</h1>
            </div>
        )
    }

    const handleAddToCart = (productId) => {
        dispatch(thunkAddToCart(productId));
    }

    const handleRemoveFavorites = (favoriteId) => {
        dispatch(removeFavorites(favoriteId));
    }

    return (
        <div className='favorite-root'>
            <h2>Favorites</h2>
            {favoriteObj.map((favorite) => {
                const product = favorite.product;
                return (
                    <div key={favorite.id}>
                        {/* <img src={product.image_url} alt={product.name} />
                        <p>{product.name}</p>
                        <p>{product.price}</p>
                        <p>{product.size}</p>
                        <button onClick={() => handleAddToCart(product.id)}>Add to cart</button>
                        <button onClick={() => handleRemoveFavorites(favorite.id)}>Remove from favorites</button> */}
                    </div>
                )
            })}
        </div>
    )

}
export default UserFavorites;
