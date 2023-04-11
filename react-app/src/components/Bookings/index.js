import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Switch, Route } from 'react-router-dom';
import { loadBookings, getUserBooking, deleteBooking, addBookings } from '../../store/booking';
import './bookings.css';
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useHistory } from 'react-router-dom';

function Bookings() {
  const user = useSelector(state => state.session.user);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [color, setColor] = useState('');
  const [weight, setWeight] = useState('');
  const [birthday, setBirthday] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    const bookingInfo = {
      name,
      type,
      image_url: imageUrl,
      color,
      weight,
      birthday,
      user_id: user.id,
    };

    const newBooking = dispatch(addBookings(parseInt(user.id), bookingInfo));

    if (newBooking) {
      setName('');
      setType('');
      setImageUrl('');
      setColor('');
      setWeight('');
      setBirthday('');
      history.push('/mybookings');
    }
  };

  const typeOptions = ['T-rex', 'Triceratops', 'Pterodactyl', 'Stegosaurus', 'Velociraptor', 'Megalodon', 'Mammoth', 'Ankylosaurus', 'Sabre-Toothed Tiger'];

  const colorOptions = ['Black', 'White', 'Brown', 'Gray', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple'];

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        {typeOptions.map((type) => (
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
      <select value={color} onChange={(e) => setColor(e.target.value)}>
        {colorOptions.map((color) => (
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
      <button type="submit">Create Booking</button>
    </form>
  );
}

export default Bookings;
