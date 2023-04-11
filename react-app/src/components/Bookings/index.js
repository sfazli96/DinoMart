import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { NavLink, Switch, Route } from 'react-router-dom'
import { loadBookings, getUserBooking, deleteBooking, addBookings } from '../../store/booking'
import './bookings.css'
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

function Bookings({user}) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [types, setTypes] = useState([
        'T-rex',
        'Triceratops',
        'Pterodactyl',
        'Stegosaurus',
        'Velociraptor',
        'Megalodon',
        'Mammoth',
        'Ankylosaurus',
        'Sabre-Toothed Tiger'
      ]);
    const [imageUrl, setImageUrl] = useState('');
    const [colors, setColors] = useState([
        'Black',
        'White',
        'Brown',
        'Red',
        'Orange',
        'Yellow',
        'Green',
        'Blue',
        'Purple',
        'Pink',
      ]);
    const [weight, setWeight] = useState('');
    const [birthday, setBirthday] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

      const handleSubmit = (e) => {
        e.preventDefault()
        const bookingInfo = {
            name,
            types,
            image_url: imageUrl,
            colors,
            weight,
            birthday,
            user_id: user.id
        }
        const newBooking = dispatch(addBookings(bookingInfo))
        if (newBooking) {
            setName('');
            setTypes('');
            setImageUrl('');
            setColors('');
            setWeight('');
            setBirthday('');
        }
    }

    const [selectedRange, setSelectedRange] = useState([null, null]);

    const onRangeChange = (range) => {
      setSelectedRange(range);
    };

    const handleCreateBooking = () => {
        const startDate = selectedRange[0]
        const endDate = selectedRange[1]
        const userId = user.id

        if (!startDate || !endDate) {
          return;
        }

        if (endDate <= startDate) {
          alert("End Date must be after start date")
          return
        }



        const hasOverlappingDates = (startDate, endDate, bookingStart, bookingEnd) => {
          return (startDate >= bookingStart && startDate <= bookingEnd) || (endDate >= bookingStart && endDate <= bookingEnd)
        }

        function conflicts(startDate, endDate, bookingsArr) {
          for (const {startDate: bookingStart, endDate: bookingEnd} of bookingsArr) {
            if (hasOverlappingDates(startDate, endDate, bookingStart, bookingEnd)) {
              return true;
            }
          }
          return false;
        }

        if (conflicts) {
          alert("The selected dates conflict with an existing booking");
          return;
        }

        dispatch(addBookings({id, startDate, endDate, userId}));
        setSelectedRange([null, null]);
      }


    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <select value={types} onChange={setTypes}>
        {types.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image URL"
          required
        />
         <select value={colors} onChange={setColors}>
        {colors.map((color) => (
          <option key={color} value={color}>{color}</option>
        ))}
      </select>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Weight"
          required
        />
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          placeholder="Birthday"
          required
        />
        <div className="calendar-container">
              <Calendar
                onChange={onRangeChange}
                value={selectedRange}
                selectRange={true}
                className="calendar"
              />
              <p>Selected range: {selectedRange[0] ? selectedRange[0].toLocaleDateString() : 'None'} to {selectedRange[1] ? selectedRange[1].toLocaleDateString() : 'None'}</p>
        </div>
        <button type="submit">Create Booking</button>
      </form>
    );
  }

  export default Bookings;
