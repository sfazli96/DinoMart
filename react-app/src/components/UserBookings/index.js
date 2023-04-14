import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { loadBookings, getUserBooking, deleteBooking, addBookings } from '../../store/booking'
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useHistory } from 'react-router-dom'
import './userBookings.css'


function UserBookings() {
    const {user_id} = useParams()
    const user = useSelector(state => state.session.user);
    const booking = useSelector(state => state.bookingsReducer.allBookings)
    // console.log('booking---', booking)
    const bookingObj = Object.values(booking)
    // console.log('bookingOBJ---', bookingObj)
    const dispatch = useDispatch();
    // const [bookings, setBookings] = useState(bookingObj);
    const [refreshPage, setRefreshPage] = useState(false)
    const history = useHistory()

    useEffect(() => {
        if (user) {
          dispatch(getUserBooking(user.id))
          };
      }, [dispatch, user]);

    const handleDeleteBooking = (id) => {
        console.log('id', id)
        dispatch(deleteBooking(id))
        history.push(`/myBookings`)
        // setRefreshPage(true)
        // setBookings(bookings.filter(booking => booking.id !== id));
    }

    // if (!bookingObj.length) {
    //     return (
    //         <div>
    //             <h2>You don't have any bookings</h2>
    //         </div>
    //     )
    // }


    if (!booking) {
        return null
    }

    if (!user) {
        return (
            <div className='booking-sign-in'>
                <h1>Sign in to see your bookings</h1>
            </div>
        )
    }

      return (
        <div className='user-booking-root-container'>
            {refreshPage ? (<p className='refresh-page'>Page is refreshing</p>) :
                <div className='user-booking-root'>
                    <h2 className='user-booking-title'>Bookings</h2>
                    {bookingObj.map((booking) => {
                        return (
                            <div key={booking.id}>
                                <h3 className='booking-name'>Name: {booking.name}</h3>
                                <p className='booking-type'>Type: {booking.type}</p>
                                <p className='booking-type'>Color: {booking.color}</p>
                                <p className='booking-weight'>Weight: {booking.weight}lb</p>
                                <p className='booking-birthday'>Birthday: {booking.birthday}</p>
                                <img className='booking-image' src={booking.image_url}></img>
                                <button onClick={() => handleDeleteBooking(booking.id)}>Delete</button>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
      )
}


export default UserBookings;
