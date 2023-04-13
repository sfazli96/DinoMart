from flask import Blueprint, jsonify, request
from app.models import Booking, User, db
from flask_login import login_required, current_user
from app.forms import BookingForm
from datetime import datetime

booking_routes = Blueprint('bookings', __name__)

@booking_routes.route('/user/<int:user_id>')
@login_required
def get_user_bookings(user_id):
    user = User.query.get(user_id)
    # print('user', user)
    bookings = Booking.query.filter(Booking.user_id == user_id).all()
    # print('bookings', bookings)

    if user is None:
        return {'message': 'User not found'}, 404
    booking_list = [booking.to_dict() for booking in bookings]
    return jsonify(bookings=booking_list)


@booking_routes.route('/user/<int:user_id>/bookings', methods=['POST'])
@login_required
def create_booking(user_id):
    if current_user.id == user_id:
        booking_data = request.get_json()
        # print('booking---------', booking_data)
        birthday = datetime.strptime(booking_data['birthday'], '%Y-%m-%d')
        booking = Booking(
            name=booking_data['name'],
            type=booking_data['type'],
            user_id=user_id,
            image_url=booking_data['image_url'],
            color=booking_data['color'],
            weight=booking_data['weight'],
            birthday=birthday
        )
        db.session.add(booking)
        db.session.commit()

        return booking.to_dict()
    else:
        return {"message": "Bad information, Please try again"}


@booking_routes.route('/<int:booking_id>', methods=['DELETE'])
@login_required
def delete_booking(booking_id):
    booking = Booking.query.get(booking_id)
    # print('BOOKING', booking)
    if not booking:
        return "Booking not found", 404

    if current_user.id != booking.user_id:
        return "Unauthorized", 401

    db.session.delete(booking)
    db.session.commit()

    return {"message": "Booking deleted successfully"}
