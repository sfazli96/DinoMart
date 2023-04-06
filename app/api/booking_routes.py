from flask import Blueprint, jsonify, request
from app.models import Booking, User, db
from flask_login import login_required, current_user
from app.forms import BookingForm

booking_routes = Blueprint('bookings', __name__)

@booking_routes.route('/user/<int:user_id>')
def get_user_bookings(user_id):
    user = User.query.get(user_id)
    print('user', user)
    bookings = Booking.query.filter_by(user_id=user_id).all()
    print('bookings', bookings)

    if user is None:
        return {'message': 'User not found'}, 404

    booking_list = [booking.to_dict() for booking in bookings]

    return {'bookings': booking_list}
