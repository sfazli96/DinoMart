import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadOnePrehistoricProduct } from "../../store/product"
import { useHistory, useParams } from "react-router-dom";
import './prehistoricProduct.css'
import Reviews from "../Review";
import { thunkAddToCart } from "../../store/cart";
import { loadFavorites, readFavorites, removeFavorites } from "../../store/favorite";
import { useState } from "react";
import { addFavorites } from "../../store/favorite";

function SinglePrehistoricProduct() {
    const dispatch = useDispatch()
    const id = useParams()
    // console.log('ID', id)
    // const ID = parseInt(id.id)
    const history = useHistory()
    const productDetail = useSelector(state => state.products.singleProduct)
    // console.log("prod", productDetail)
    const user = useSelector(state => state.session.user)
    const userId = user?.id
    const favoriteDetail = useSelector(state => state.favoriteReducer?.favorites || [] || {});
    console.log(favoriteDetail, 'FAVORITE----')
    const [isFavorite, setIsFavorite] = useState(false);
    const [errors, setErrors] = useState([])

    useEffect(() => {
        dispatch(loadOnePrehistoricProduct(id.id))
        if (user) {
            dispatch(readFavorites(user?.id))
        }
    }, [dispatch, id.id, user])

    useEffect(() => {
        if (favoriteDetail && Array.isArray(favoriteDetail) && favoriteDetail.some(favorite => favorite.id === productDetail.id)) {
            setIsFavorite(true);
        } else {
          setIsFavorite(false);
        }
      }, [favoriteDetail, productDetail.id]);


    if (Object.values(productDetail).length === 0) {
        return (
            <div>
                <h1>404 Not found</h1>
                <p>This page does not exist, try again</p>
            </div>
        )
    }
    // let multiImage = () => {
    //     let image;
    //     productsArr.map(({image_url}) => {
    //         // console.log(image_url, 'IMAGE')
    //         let split = image_url.split(',')
    //         // console.log('SPLIT', split)
    //         split.forEach(img => {
    //             image = img
    //         });
    //     })
    //     return image
    // }
    // console.log('MULTI', multiImage())
    // const handleClick = () => {
    //     setErrors([])
    //     const productId = productDetail.id
    //     if (isFavorite) {
    //         dispatch(removeFavorites(productId))
    //         .then(() => {
    //             dispatch(readFavorites(parseInt(userId)))
    //         })
    //         .catch(async (res) => {
    //             const data = await res.json()
    //             if (data && data.errors) setErrors(data.errors)
    //         })
    //     } else {
    //         return dispatch(addFavorites({userId, productId}))
    //         .then(() => {
    //             dispatch(readFavorites(parseInt(userId)))
    //         })
    //         .catch(async (res) => {
    //             const data = await res.json()
    //             if (data && data.errors) setErrors(data.errors)
    //         })
    //     }

    // }
    const handleClick = () => {
        if (user && productDetail) {
          if (isFavorite) {
            dispatch(removeFavorites(userId, productDetail.id))
              .then(() => setIsFavorite(false));
          } else {
            dispatch(addFavorites(userId, productDetail.id))
              .then(() => setIsFavorite(true));
          }
        }
      };

    // const handleDeleteFavorite = (id) => {
    //     dispatch(removeFavorites(id)).then(() => {
    //         dispatch(readFavorites(id))
    //     })
    // }

    const cartButton = () => {
        dispatch(thunkAddToCart(user?.id, id.id))
            .then(() => {
                history.push('/cart')
            })
    }
    return (
        <div className="single-product-page-container">
            {/* <h1>TEST</h1> */}
            <div className="product-name-price-image">
                <h2>{productDetail.name}</h2>
                <h2>$ {productDetail.price}</h2>
                <img className='product-image' src={productDetail.image_url}></img>
            </div>
            <p className="description">{productDetail.description}</p>
            {/* <div>
                <img src={multiImage()}></img>
            </div> */}
            {user ? (
                <div className="add-to-cart-button">
                    <button className="cart-button" onClick={() => cartButton(id)}>Add to Cart</button>
                    <button className="favorite-button" onClick={handleClick}>
                        {isFavorite ? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>}
                    </button>
                </div>

            ) : null}
            <div className="review-component">
                <Reviews />
            </div>
        </div>
    )
}


export default SinglePrehistoricProduct
