from flask import Blueprint, jsonify, request
import datetime
from app.models import Booking, User, db
from flask_login import login_required, current_user
from app.forms import BookingForm

booking_routes = Blueprint('bookings', __name__)


@booking_routes.route('/users/<int:user_id>', methods=['POST'])
# @login_required
def create_bookings(user_id):
    user_booking = User.query.get(user_id)
    print('user', user_booking)

    form = BookingForm()
    print('FORM', form)

    if form.validate_on_submit():
        booking = Booking(
            name = form.name.data,
            type = form.type.data,
            user = user_booking,
            image_url = form.image_url.data,
            color = form.color.data,
            weight = form.weight.data,
            birthday = form.birthday.data
        )

        db.session.add(booking)
        db.session.commit()

    return jsonify({'message': 'Booking created successfully'})
