import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { NavLink, Switch, Route } from 'react-router-dom'
import { loadBookings, getUserBooking, deleteBooking, addBookings } from '../../store/booking'
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useHistory } from 'react-router-dom'

function UserBookings() {
    const {user_id} = useParams()
    const user = useSelector(state => state.session.user);
    const booking = useSelector(state => state.bookingsReducer.singleBooking)
    console.log('booking---', booking)
    const bookingObj = Object.values(booking)
    console.log('bookingOBJ---', bookingObj)
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
          dispatch(getUserBooking(user.id))
          };
      }, [dispatch, user]);

    const handleDeleteBooking = (e, id) => {
        e.preventDefault()
        dispatch(deleteBooking(id))
    }

    if (!booking) {
        return null
    }

      return (
        <div>
            <h1>TEST</h1>
            <h2>Bookings</h2>
            {bookingObj.map((booking) => {
                return (
                    <div key={booking.id}>
                        <h3>{booking.name}</h3>
                        <p>{booking.type}</p>
                        <p>{booking.color}</p>
                        <p>{booking.weight}</p>
                        <p>{booking.birthday}</p>
                        <button onClick={(e) => handleDeleteBooking(e, booking.id)}>Delete</button>
                    </div>
                )
            })}
        </div>
      )
}


export default UserBookings;
