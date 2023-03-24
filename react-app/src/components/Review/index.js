import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteReviews, readAllReviews } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import { addReviews } from "../../store/reviews"
import ReactStars from "react-rating-stars-component";


const Reviews = () => {
    const dispatch = useDispatch()
    const id = useParams()
    const ID = parseInt(id.id)
    // console.log('id', ID)
    const user = useSelector(state => state.session.user)
    const userId = user?.id
    const reviewsObj = useSelector(state => state.review?.reviews || {})
    const reviews = Object.values(reviewsObj)
    // console.log('reviewObj', reviewsObj)
    // console.log('reviews', reviews)
    const [rating, setRating] = useState(5)
    const [review, setReview] = useState()
    const [showForm, setShowForm] = useState(false)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        dispatch(readAllReviews(ID))
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])
        if (!review || review.length < 3) {
            setErrors(["Please enter a review with at least 3 characters"])
            setTimeout(() => {
                setErrors([])
            }, 2000);
            return
        }
        return dispatch(addReviews(ID, { userId, id, review, rating }))
            .then(() => {
                dispatch(readAllReviews(id.id))
                setShowForm(false)
                setReview("")
            })
            .catch(async (res) => {
                const data = await res.json()
                if (data && data.errors) setErrors(data.errors)
            })
    }


    const handleChange = (e) => {
        if (e.target.value.length <= 200) {
            setReview(e.target.value)
        }
    }
    const ratingChanged = (newRating) => {
        setRating(newRating)
    };

    const handlingDeleteReview = async (id) => {
        await dispatch(deleteReviews(id))
        dispatch(readAllReviews(ID))
    }

    
    return (
        <div>
            {reviews.reverse().map(({ id, review, rating, user_id }) => {
                return (
                    <div key={id}>
                        <p className="review-rating">{rating}</p>
                        {user_id === userId && (
                            <button style={{ width: "70px", height: "25px" }} className="delete-review-button" onClick={handlingDeleteReview}>
                                Delete Review
                            </button>
                        )}
                        <p className="review-text">{review}</p>
                    </div>
                )
            })}
            <div>
                <button onClick={() => setShowForm(true)}>Create a Review</button>
                {showForm && (<form onSubmit={handleSubmit} noValidate>
                    <ul className="ul">
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                    <textarea type="textbox" defaultValue="Post your amazing review here!" value={review} onChange={handleChange} required></textarea>
                    <ReactStars
                        count={5}
                        value={rating}
                        onChange={ratingChanged}
                        size={24}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                    />
                    <button className="submit-button" type="submit">Submit</button>
                </form>
                )}
            </div>
        </div>
    )
}

export default Reviews
