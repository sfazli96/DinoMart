import { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { NavLink, Switch, Route } from 'react-router-dom'
import { loadAnimalProduct } from '../../store/product'
import './prehistoricProducts.css'


function PrehistoricProducts() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const animalProducts = useSelector(state => state.products.allProducts)
    console.log('Animal', animalProducts)
    const productsArr = Object.values(animalProducts || [])


    useEffect(() => {
        dispatch(loadAnimalProduct())
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
    return (
        <div>
            <h1>Welcome to SamMart</h1>
            <div className='banner-container'>
                <img className='banner-image' src='https://idsb.tmgrup.com.tr/ly/uploads/images/2022/08/04/222563.jpg' alt='image not found'></img>
            </div>
            {productsArr.map(({id, name, description, price, image_url, size}) => {
                return (
                    <div key={id} className="image-container">
                        <NavLink to={`/products/${id}`}>
                            <img src={image_url} alt="image not found" className='prehistoric-image'></img>
                            <p className='price'>$ {price}</p>
                        </NavLink>
                    </div>
                )
            })}
            {/* <div>
                <img src={multiImage()}></img>
            </div> */}
        </div>
    )
}










export default PrehistoricProducts;
