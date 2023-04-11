const LOAD_BOOKINGS = 'bookings/loadBookings'
const ADD_BOOKINGS = 'bookings/addBookings'
const EDIT_BOOKINGS = 'bookings/editBookings'
const DELETE_BOOKINGS = 'bookings/deleteBooking'

export const loadBookings = (bookings) => ({
    type: LOAD_BOOKINGS,
    payload: bookings
})

export const createBooking = (bookings) => ({
    type: ADD_BOOKINGS,
    payload: bookings
})

export const removeBooking = (bookings) => ({
    type: DELETE_BOOKINGS,
    payload: bookings
})

export const updateBookings = (bookings) => ({
    type: EDIT_BOOKINGS,
    payload: bookings
})


export const getUserBooking = (user_id) => async (dispatch) => {
    const response = await fetch(`/api/bookings/user/${user_id}`);
    if (response.ok) {
      const bookingData = await response.json();
      dispatch(loadBookings(bookingData));
      console.log(bookingData, 'DATA----')
      return bookingData;
    }
  };

export const addBookings = (user_id, bookingInfo) => async (dispatch) => {
    const response = await fetch(`/api/bookings/user/${user_id}/bookings`, {
        method: 'POST',
        body: JSON.stringify(bookingInfo)
    })
    if (response.ok) {
        const booking = await response.json()
        dispatch(createBooking(booking))
        return booking
    }
}

export const deleteBooking = (booking) => async (dispatch) => {
    const response = await fetch(`/api/bookings/${booking}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(removeBooking(data))
        return data
    }
}

export const editBookings = (booking) => async (dispatch) => {
    const response = await fetch(`/api/bookings/${booking.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(updateBookings(data))
        // console.log('after dispatch', data)
        return data
    }
}

// initialState
// const initialState = { allBookings: {}, user: {}, spot: {} }
const initialState = { allBookings: {}, singleBooking: {} }

export const bookingsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_BOOKINGS:
            if (!action.payload || !action.payload.booking) return state
            newState = { ...state }
            let copy = {}
            action.payload.booking.forEach(booking => {
                console.log('booking', booking)
                console.log('action', action.payload)
                copy[booking.id] = booking
            });
            newState.allBookings = copy
            return newState
        case ADD_BOOKINGS:
            newState = { ...state }
            let copy2 = { ...newState.allBookings }
            copy[action.payload.id] = action.payload
            newState.allBookings = copy2
            return newState;
        case EDIT_BOOKINGS:
            const updatedBookings = { ...state.singleBooking }
            updatedBookings[action.payload.id] = action.payload
            return { ...state, singleBooking: updatedBookings }
        case DELETE_BOOKINGS:
            newState = { ...state, allBookings: { ...state.allBookings } }
            delete newState.allBookings[action.payload.id]
            return newState
        default:
            return state
    }
}
