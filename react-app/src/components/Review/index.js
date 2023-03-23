import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { readAllReviews } from "../../store/reviews";


const Reviews = () => {
    const dispatch = useDispatch()
    const id = useParams()
    const ID = parseInt(id.id)
    // console.log('id', ID)
    const user = useSelector(state => state.session.user)
    const reviewsObj = useSelector(state => state.review?.reviews || {})
    console.log('reviewObj', reviewsObj)
    const reviews = Object.values(reviewsObj)
    console.log('reviews', reviews)
    const [rating, setRating] = useState(5)
    const [review, setReview] = useState()

    useEffect(() => {
        dispatch(readAllReviews(ID))
    }, [dispatch])


    return (
        <div>
            <h1>TEST</h1>
            {reviews.map(review => {
                return (
                <div key={review.id}>
                    <p>{review.rating}</p>
                    <p>{review.review}</p>
                </div>
                )
            })}
        </div>
    )
}

export default Reviews
