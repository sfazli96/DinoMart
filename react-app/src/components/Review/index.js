import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { removeReview, readAllReviews } from "../../store/reviews";
import { addReviews } from "../../store/reviews"
import ReactStars from "react-rating-stars-component";
import EditReview from "./EditReview/EditReview";
import './review.css'


const Reviews = () => {
  const dispatch = useDispatch()
  const id = useParams()
  // console.log(id, 'id')
  const ID = parseInt(id.id)
  // console.log('id', ID)
  const user = useSelector(state => state.session?.user)
  const userId = user?.id
  const reviewsObj = useSelector(state => state.review?.reviews || {})
  const reviews = Object.values(reviewsObj)
  // console.log('reviewObj', reviewsObj)
  // console.log('reviews', reviews)
  const [rating, setRating] = useState(5)
  const [review, setReview] = useState()
  const [showForm, setShowForm] = useState(false)
  const [errors, setErrors] = useState([])
  const [validationErrors, setValidationErrors] = useState([]);
  const [isEdit, setIsEdit] = useState(null)
  const [showCreateReview, setShowCreateReview] = useState(true);

  useEffect(() => {
    if (user) {
      dispatch(readAllReviews(ID))
      setShowCreateReview(true);
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

  useEffect(() => {
    setShowCreateReview(!reviews.find((review) => review.users_id === user?.id));
  }, [reviews, user]);


  const handleSubmit = (e) => {
    e.preventDefault()
    setShowCreateReview(false);
    setErrors([])
    if (!review || review.length < 3) {
      setErrors(["Please enter a review with at least 3 characters"])
      setTimeout(() => {
        setErrors([])
      }, 2000);
      return
    }
    return dispatch(addReviews(ID, { userId, id: parseInt(id.id), review, rating }))
      .then(() => {
        dispatch(readAllReviews(parseInt(id.id)))
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
  }
  const handlingDeleteReview = (id) => {
    dispatch(removeReview(id)).then(() => {
      dispatch(readAllReviews(ID))
    })
  }

  const formatDate = (time) => {
    const date = new Date(time)
    const options = {
      year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric',
      // timeZoneName: 'short'
    }
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const pst = date.toLocaleString('en-US', { ...options, timeZone: 'America/Los_Angeles' });
    const est = date.toLocaleString('en-US', { ...options, timeZone: 'America/New_York' });
    const cst = date.toLocaleString('en-US', { ...options, timeZone: 'America/Chicago' });
    return `${pst}\n PST, ${est}\n EST, ${cst} CST`
    // if (timeZone === 'America/New_York') {
    //   return `${est} EST`;
    // } else if (timeZone === 'America/Los_Angeles') {
    //   return `${pst} PST`;
    // } else if (timeZone === 'America/Chicago') {
    //   return `${cst} CST`;
    // } else {
    //   return `${est} EST`;
    // }
    // return date.toLocaleString('en-US', options)
  }
  let users_id;
  {
    reviews.map(({ user_id }) => {
      users_id = user_id
    })
    // console.log('user_ID', users_id)
    return (
      <div>
        <div>
          {showCreateReview && user?.id && users_id !== user?.id ? (
            <button className='show-create-review-button' onClick={() => setShowForm(true)}>Create a Review</button>
          ) : null}
        </div>
        {showForm && (
          <form onSubmit={handleSubmit} noValidate className="review-form-big">
            <ul className="ul">
              {errors.map((error, idx) => (
                <div key={idx} className='error-form-message'>{error}</div>
              ))}
            </ul>
            <textarea
              type="textbox"
              // defaultValue="Post your amazing review here!"
              value={review}
              onChange={handleChange}
              required
            ></textarea>
            <ReactStars
              count={5}
              value={rating}
              onChange={ratingChanged}
              size={24}
              isHalf={true}
              decimalPlaces={1}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
            />
            <button className="submit-button" type="submit">
              Submit
            </button>
          </form>
        )}
        {reviews.reverse().map(({ id, review, rating, user_id, created_at, username }) => {
          // const username = user_id === user?.id ? user.username : null;
          const userHasReview = reviews.some(({ user_id }) => user_id === userId)
          // console.log('username', username)
          return (
            <div key={id}>
              <div className="review-card-container">
                <p className="review-rating">
                  {/* {rating} */}
                  {Array.from({ length: rating }, (_, index) => (
                    <span key={index} className="star">&#9733;</span>
                  ))}
                  {Array.from({ length: 5 - rating }, (_, index) => (
                    <span key={index} className="star">&#9734;</span>
                  ))}
                </p>
                <p className="review-text">{review}</p>
                {username && <p>By: {username}</p>}
                <p className="createdAt">Created at: {formatDate(created_at)}</p>
                {user_id === userId && (
                  <div>
                    <button
                      className="delete-review-button"
                      onClick={() => handlingDeleteReview(id)}
                    >
                      Delete Review
                    </button>
                    {/* <EditReview /> */}
                    <button
                      className="edit-review-button"
                      onClick={() => setIsEdit(id)}
                    >
                      Edit Review
                    </button>
                  </div>
                )}
                {isEdit === id && <EditReview id={{ id }} onClose={() => setIsEdit(null)}
                initialReview={reviews.find((r) => r.id === isEdit).review}
                initialRating={reviews.find((r) => r.id === isEdit).rating}/>}
              </div>
            </div>
          );
        })}
        {validationErrors.length > 0 && (
          <div className="error-message">
            {validationErrors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Reviews
