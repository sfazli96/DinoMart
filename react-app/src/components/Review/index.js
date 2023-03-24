import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { removeReview, readAllReviews, editReview } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import { addReviews } from "../../store/reviews"
import ReactStars from "react-rating-stars-component";


const Reviews = () => {
    const dispatch = useDispatch()
    const id = useParams()
    // console.log(id, 'id')
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
    const [newReviewData, setNewReviewData] = useState({});
    const [isEdit, setIsEdit] = useState(null)
    const [newReview, setNewReview] = useState("")
    const [newRating, setNewRating] = useState("")
    const [errors, setErrors] = useState([])
    const [validationErrors, setValidationErrors] = useState([]);

    useEffect(() => {
        if (user) {
            dispatch(readAllReviews(ID))
        }
    }, [dispatch, user])

    useEffect(() => {
        if (!user) {
            setValidationErrors(["You must be logged in to see your reviews!"])
        } else if (reviews.length === 0) {
            setValidationErrors(["No reviews are here, make a review on a product"])
        } else {
            setValidationErrors([])
        }
    }, [reviews.length, user])

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

    const handlingDeleteReview = (id) => {
        dispatch(removeReview(id)).then(() => {
            dispatch(readAllReviews(ID))
        })
    }

    const handleSave = (review) => {
        const errors = []
        if (!newReview.length) {
            errors.push('Please enter a review')
        } else if (newReview.length > 255) {
            errors.push('Review is way too long, please try again')
        } else if (!newRating) {
            errors.push('Please rate this product')
        }
        setErrors(errors)
        if (!errors.length) {
            dispatch(editReview({ id: newReview.id, review: newReview, rating: newRating}))
            setIsEdit(null)
            setNewReview("")
            setNewRating(0)
            dispatch(readAllReviews(ID))
        }
    }

    const handleEdit = (id, review) => {
        setIsEdit(id)
        setNewReviewData({ id: id, review: review.review, rating: review.ratings })
        setNewReview(review.review)
        setNewRating(review.rating)
    }


    return (
        <div>
            {reviews.reverse().map(({ id, review, rating, user_id }) => {
                return (
                    <div key={id}>
                        <p className="review-rating">{rating}</p>
                        {user_id === userId && (
                            <div>
                                <button className="delete-review-button" onClick={() => handlingDeleteReview(id)}>
                                    Delete Review
                                </button>
                                <button className="edit-review-button" onClick={() => setIsEdit(id)}>
                                    <i className="fas fa-edit"></i>
                                </button>
                            </div>
                        )}
                        <p className="review-text">{review}</p>
                    </div>
                )
            })}
            {validationErrors.length > 0 && (
                <div className="error-message">
                    {validationErrors.map((error, index) => (
                    <p key={index}>{error}</p>
                    ))}
                </div>
            )}
            {isEdit === reviews?.id ? (
                <div className="edit-review-form">
                {errors.map((error, index) => (
                <div key={index} className="error-msg">{error}</div>
                ))}
                <textarea
                type="textbox"
                defaultValue="Edit your amazing review here!"
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                required
                ></textarea>
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
            </div>
            ): null}
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
