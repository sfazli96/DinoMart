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
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  if (!user) {
    return (
        <div>
            <h1 className='sign-in-create-booking'>Sign in to create a booking</h1>
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
      setErrors(errors => [...errors, 'Please enter a valid weight (must be a positive weight between 0 and 50000 lb'])
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

    // try {
    //   const imageUrlObj = new URL(imageUrl)
    //   if (imageUrlObj.protocol !== 'http:' && imageUrlObj.protocol !== 'https:') {
    //     setErrors(errors => [...errors, 'Please enter a valid image link (http/https protocol)']);
    //     return;
    //   }
    // } catch (error) {
    //   setErrors(errors => [...errors, 'Please enter a valid image link']);
    //   return;
    // }
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

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImageUrl(file);
}

  const typeOptions = ['T-rex', 'Triceratops', 'Pterodactyl', 'Stegosaurus', 'Velociraptor', 'Megalodon', 'Mammoth', 'Ankylosaurus', 'Sabre-Toothed Tiger'];

  const colorOptions = ['Black', 'White', 'Brown', 'Gray', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple'];

  return (
    <div className='booking-form-root'>
      <form onSubmit={handleSubmit} className='booking-form'>
      <h1 className='add-booking'>Add a booking</h1>
        <ul className="error-message">
            {errors.map((error, idx) => (
            <div key={idx} className="error-text">
              {error}
            </div>
          ))}
        </ul>
        <label className='booking-form-label'>
          Pet Name:
        <input className='booking-input'
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Pet Name"
          required
          />
        </label>
        <label className='booking-form-label'>
          Type:
        <select value={type} onChange={(e) => setType(e.target.value)}>
          {typeOptions.map((type) => (
            <option key={type}
              value={type}>{type}
            </option>
          ))}
        </select>
        </label>
        {/* <label className='booking-form-label'>
          Image Url:
        <input className='booking-input'
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image URL"
          required
          />
        </label> */}
        <label className="imagelabel">
              Image
              <input
                  type="file"
                  accept="image/*"
                  onChange={updateImage}
              />
        </label>
        <label className='booking-form-label'>
          Color:
          <select value={color} onChange={(e) => setColor(e.target.value)}>
            {colorOptions.map((color) => (
              <option key={color}
              value={color}>{color}
              </option>
            ))}
          </select>
        </label>
        <label className='booking-form-label'>
          Weight:
          <input className='booking-input'
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Weight"
            required
          />
        </label>
        <label className='birthday'>Birthday: </label>
        <input className='booking-input'
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          placeholder="Birthday"
          required
          />
        <button type="submit-booking-button">Create Booking</button>
      </form>
  </div>
  );
}

export default Bookings;
