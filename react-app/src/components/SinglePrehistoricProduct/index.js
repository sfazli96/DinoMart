import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadOnePrehistoricProduct } from "../../store/product"
import { useHistory, useParams } from "react-router-dom";
import './prehistoricProduct.css'
import Reviews from "../Review";
import { thunkAddToCart } from "../../store/cart";

function SinglePrehistoricProduct() {
    const dispatch = useDispatch()
    const id = useParams()
    // console.log('ID', id)
    const history = useHistory()
    const productDetail = useSelector(state => state.products.singleProduct)
    // console.log("prod", productDetail)
    const user = useSelector(state => state.session.user)


    useEffect(() => {
        dispatch(loadOnePrehistoricProduct(id.id))
    }, [dispatch])
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
    const cartButton = () => {
        dispatch(thunkAddToCart(user?.id, id.id))
        .then(() => {
            history.push('/cart')
        })
    }
    return (
        <div>
            {/* <h1>TEST</h1> */}
            <h2>{productDetail.name}</h2>
            <h2>$ {productDetail.price}</h2>
            <img clasName='product-image'src={productDetail.image_url}></img>
            <p className="description">{productDetail.description}</p>
             {/* <div>
                <img src={multiImage()}></img>
            </div> */}
            <div className="add-to-cart-button">
                <button className="cart-button" onClick={() => cartButton(id)}>Add to Cart</button>
            </div>
            <div>
                <Reviews />
            </div>
        </div>
    )
}


export default SinglePrehistoricProduct
