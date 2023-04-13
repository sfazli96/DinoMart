from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Booking
from flask_login import login_required, current_user
from app.forms import BookingForm
from app import db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:user_id>/bookings', methods=['POST'])
# @login_required
def create_bookings(user_id):
    user_booking = User.query.get(user_id)
    # print('user', user_booking)

    form = BookingForm()
    # print('FORM', form)

    if form.validate_on_submit():
        booking = Booking(
            name = form.name.data,
            type = form.type.data,
            user = user_booking,
            image_url = form.image_url.data,
            color = form.color.data,
            weight = form.weight.data,
            birthday = form.birthday.data,
            # user_id = user_id
        )

        db.session.add(booking)
        db.session.commit()

    return jsonify({'message': 'Booking created successfully'})
