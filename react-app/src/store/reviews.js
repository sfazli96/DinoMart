const LOAD_REVIEWS = 'reviews/loadReviews'
const ADD_REVIEWS = 'reviews/addReviews'
const EDIT_REVIEWS = 'reviews/editReviews'
const DELETE_REVIEWS = 'reviews/deleteReviews'

const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    payload: reviews
})

const createReview = (reviews) => ({
    type: ADD_REVIEWS,
    payload: reviews
})

const updateReview = (reviews) => ({
    type: EDIT_REVIEWS,
    payload: reviews
})

const deleteReviews = (reviewId) => ({
    type: DELETE_REVIEWS,
    payload: reviewId
})

export const readAllReviews = (id) => async (dispatch) => {
    const response = await fetch(`/api/products/${id}`)
    const reviews = await response.json()
    dispatch(loadReviews(reviews))
}

export const addReviews = (id, review) => async (dispatch) => {
    const response = await fetch(`/api/products/${id}/reviews`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user_id: review.user_id,
            product_id: id,
            review: review.review,
            rating: review.rating
        })
    })
    if (response.ok) {
        const review = await response.json()
        dispatch(createReview(review))
        return review
    }
}

const initialState = { productReviews:{}, userSpecificReviews: {} }

export const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_REVIEWS:
            newState = {...state}
            let copy = {}
            action.payload.Review.forEach(element => {
                copy[review.id] = element
            });
            newState.productReviews = copy
            return newState
        case ADD_REVIEWS:
            newState = {...state, productReviews: {...state.productReviews}}
            newState.productReviews[action.payload.id] = action.payload
            return newState
        default:
            return newState
    }
}
