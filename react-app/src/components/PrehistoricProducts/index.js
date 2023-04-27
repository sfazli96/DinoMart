import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { NavLink, Switch, Route } from 'react-router-dom'
import { loadAnimalProduct } from '../../store/product'
import './prehistoricProducts.css'


function PrehistoricProducts() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const animalProducts = useSelector(state => state.products.allProducts)
    // console.log('Animal', animalProducts)
    const productsArr = Object.values(animalProducts || [])


    useEffect(() => {
        dispatch(loadAnimalProduct())
    }, [dispatch])

    return (
        <div className='whole-container'>
            <h1 className='welcome-title'>Welcome to Sam-Mart</h1>
            <h2 className='purchase-animals'>Purchase prehistoric animals here</h2>
            <div className='banner-container'>
                <img className='banner-image' src='https://idsb.tmgrup.com.tr/ly/uploads/images/2022/08/04/222563.jpg' alt='image not found'></img>
            </div>
            <div className='root-container'>
                {productsArr.map(({ id, name, description, price, image_url, size }) => {
                    return (
                        <div key={id} className="image-container">
                            <NavLink to={`/products/${id}`}>
                                <img src={image_url} alt="image not found" className='prehistoric-image'></img>
                                <p className='product-name'>{name}</p>
                                <p className='price'>$ {price}</p>
                            </NavLink>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}










export default PrehistoricProducts;
