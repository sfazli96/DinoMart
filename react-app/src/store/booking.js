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
    //   console.log(bookingData, 'DATA----')
      return bookingData;
    }
  };

  export const addBookings = (user_id, bookingInfo) => async (dispatch) => {
    const formData = new FormData()
    formData.append("image_url", bookingInfo.image_url)
    formData.append("name", bookingInfo.name)
    formData.append("type", bookingInfo.type)
    formData.append("user_id", bookingInfo.user_id);
    formData.append("color", bookingInfo.color)
    formData.append("birthday", bookingInfo.birthday)
    formData.append("weight", bookingInfo.weight)
    // console.log(bookingInfo.weight, 'WEIGHT----')
    // console.log(bookingInfo, 'booking----')
    const response = await fetch(`/api/bookings/user/${bookingInfo.user_id}/bookings`, {
        method: 'POST',
        body: formData,
        // headers: {
        //     'Content-Type': 'multipart/form-data'
        // }
    })

    if (response.ok) {
        const booking = await response.json()
        dispatch(createBooking(booking))
        return booking
    }
}


export const deleteBooking = (booking_id) => async (dispatch) => {
    // console.log('booking_id', booking_id)
    const response = await fetch(`/api/bookings/${booking_id}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        const data = await response.json()
        // console.log('data', data)
        dispatch(removeBooking(data))
        // dispatch(loadBookings(data))
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
            if (!action.payload) return state;
            const bookings = action.payload.bookings;
            const allBookings = {};
            bookings?.forEach((booking) => {
                allBookings[booking.id] = booking;
            });
            return { ...state, allBookings };
            // newState = { ...state }
            // let copy = {}
            // action.payload.bookings.forEach(booking => {
            //     copy[booking.id] = booking
            // });
            // newState.allBookings = copy
            // return newState

            case ADD_BOOKINGS:
                return {
                  ...state,
                  allBookings: {
                    ...state.allBookings,
                    [action.payload.booking.id]: action.payload.booking,
                  },
                };

        case EDIT_BOOKINGS:
            const updatedBookings = { ...state.singleBooking }
            updatedBookings[action.payload.id] = action.payload
            return { ...state, singleBooking: updatedBookings }
        case DELETE_BOOKINGS:
            newState = {...state}
            let copy2 = {...newState.allBookings}
            delete copy2[action.payload.id]
            newState.allBookings = copy2
            return newState
            // const newAllBookings = { ...state.allBookings };
            // delete newAllBookings[action.payload.id];
            // return { ...state, allBookings: newAllBookings };

        default:
            return state
    }
}
