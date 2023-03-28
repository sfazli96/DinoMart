const LOAD_REVIEWS = 'reviews/loadReviews'
const ADD_REVIEWS = 'reviews/addReviews'
const EDIT_REVIEWS = 'reviews/editReviews'
const DELETE_REVIEWS = 'reviews/deleteReviews'

export const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    payload: reviews
})

export const createReview = (reviews) => ({
    type: ADD_REVIEWS,
    payload: reviews
})

export const updateReview = (reviews) => ({
    type: EDIT_REVIEWS,
    payload: reviews
})

export const deleteReviews = (reviewId) => ({
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

export const editReview = (review) => async (dispatch) => {
    // console.log('review', review)
    const response = await fetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            review: review.review,
            rating: review.rating,
            product_id: review.id
        })
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(updateReview(data))
        return data
    }
}

export const removeReview = (id) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(deleteReviews(data))
        return data
    }
}

const initialState = { reviews:{}, userSpecificReviews: {} }

export const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_REVIEWS:
            if (!action.payload || !action.payload.reviews) return state
            newState = {...state}
            // console.log('new', newState)
            let copy = {}
            action.payload.reviews.forEach(review => {
                // console.log('action', action.payload)
                // console.log('review', review)
                copy[review.id] = review
            });
            newState.reviews = copy
            return newState
        case ADD_REVIEWS:
            newState = {...state, reviews: {...state.reviews}}
            newState.reviews[action.payload.id] = action.payload
            return newState
        case EDIT_REVIEWS:
            const updatedReviews = {...state.reviews }
            updatedReviews[action.payload.id] = action.payload
            return {...state, reviews: updatedReviews }
        case DELETE_REVIEWS:
            newState = {...state}
            let copy2 = {...newState.ProductReviews}
            delete copy2[action.payload.id]
            newState.ProductReviews = copy2
            return newState
        default:
            newState = {...state}
            return newState
    }
}
