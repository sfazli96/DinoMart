import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { thunkAddToCart } from '../../store/cart';
import './myFavorite.css'
import { loadOnePrehistoricProduct } from '../../store/product';
import { readFavorites, removeFavorites } from '../../store/favorite';
import { useHistory} from "react-router-dom";

function UserFavorites() {
    const id  = useParams()
    console.log('id', id)
    const user = useSelector(state => state.session.user);
    const userId = user?.id
    console.log('userId', userId)
    const productDetail = useSelector(state => state.products?.singleProduct);
    // const pId = useParams()
    const productId = productDetail?.id
    console.log('productId', productId)
    const favoriteDetail = useSelector(state => state.favoriteReducer?.favorites || [] || {});
    const favoriteObj = Object.values(favoriteDetail)
    const favorite = favoriteObj?.find(favorite => favorite?.product_id === productDetail?.id && userId === favorite.user_id)
    console.log('favorite', favorite)
    const favProductId = favorite?.product_id
    console.log('favProductId', favProductId)
    const history = useHistory()

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadOnePrehistoricProduct(userId));
        if (user) {
            dispatch(readFavorites(userId))
        }
    }, [dispatch, userId, id]);

    if (!productDetail) {
        return (
            <div>
                <h1>Not found</h1>
            </div>
        )
    }

    const favorites = productDetail?.favorites;

    if (!user) {
        return (
            <div>
                <h1>Sign in to see your favorites</h1>
            </div>
        )
    }

    const handleAddToCart = () => {
        dispatch(thunkAddToCart(user?.id, productId.id))
        .then(() => {
            history.push('/cart')
        })
    }

    return (
        <div className='favorite-root'>
            <h2>Favorites</h2>
            {favorites && favorites.map((favorite) => {
                const product = favorite.product_id;
                console.log('product', product)
                return (
                    <div key={favorite.id}>
                        <img src={product.image_url} alt={product.name} />
                        <button onClick={() => handleAddToCart(id)}>Add to cart</button>
                        <button onClick={() => dispatch(removeFavorites(favorite.id))}>Remove from favorites</button>
                    </div>
                )
            })}
        </div>
    )

}
export default UserFavorites;
