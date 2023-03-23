import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadOnePrehistoricProduct } from "../../store/product"
import { useParams } from "react-router-dom";
import './prehistoricProduct.css'
import Reviews from "../Review";

function SinglePrehistoricProduct() {
    const dispatch = useDispatch()
    const id = useParams()
    // console.log('ID', id)
    const productDetail = useSelector(state => state.products.singleProduct)
    // console.log("prod", productDetail)
    const user = useSelector(state => state.session.user)


    useEffect(() => {
        dispatch(loadOnePrehistoricProduct(id.id))
    }, [dispatch])

    return (
        <div>
            {/* <h1>TEST</h1> */}
            <h2>{productDetail.name}</h2>
            <h2>{productDetail.description}</h2>
            <h2>$ {productDetail.price}</h2>
            <img src={productDetail.image_url}></img>
            <div>
                <Reviews />
            </div>
        </div>
    )
}


export default SinglePrehistoricProduct
