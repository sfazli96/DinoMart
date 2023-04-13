import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBookings } from '../../store/booking';
import './bookings.css';
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
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState([]);

  if (!user) {
    return (
        <div>
            <h1>Sign in to create a booking</h1>
        </div>
    )
}
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([])
    const bookingInfo = {
      name,
      type,
      user_id: user.id,
      image_url: imageUrl,
      color,
      weight,
      birthday,
    };

    const selectedBirthday = new Date(birthday)
    const presentDate = new Date()

    if (name.length === 0 || name.length > 25) {
      setErrors(errors => [...errors, 'Please enter a valid name (less than 25 characters)'])
      return
    }
    if (weight <= 0 || !weight || weight > 50000) {
      setErrors(errors => [...errors, 'Please enter a valid price (must be a positive number between 0 and 50000'])
      return
    }
    if (!Number(weight)) {
      setErrors(errors => [...errors, "Weight must be a number"])
      return
    }

    if (selectedBirthday > presentDate) {
      setErrors(errors => [...errors, 'Please select a date that is not in the future']);
      return;
    }

    try {
      const imageUrlObj = new URL(imageUrl)
      if (imageUrlObj.protocol !== 'http:' && imageUrlObj.protocol !== 'https:') {
        setErrors(errors => [...errors, 'Please enter a valid image link (http/https protocol)']);
        return;
      }
    } catch (error) {
      setErrors(errors => [...errors, 'Please enter a valid image link']);
      return;
    }
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
    <form onSubmit={handleSubmit} className='booking-form'>
       <ul className="error-message">
          {errors.map((error, idx) => (
          <div key={idx} className="error-text">
            {error}
          </div>
        ))}
      </ul>
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
      <label className='birthday'>Birthday: </label>
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
