"""
User Routes Module

This module defines routes and functions related to user management and bookings using Flask.

Routes:
    - '/' (GET): Retrieve a list of all users in the system along with their details.
    - '/<int:id>' (GET): Retrieve a user by their ID and return their details in a dictionary.

Dependencies:
    - Flask: Flask is a micro web framework used for building web applications. It is used here to define and handle routes.
    - Blueprint: Blueprint is a Flask feature that allows organizing routes and views into reusable components.
    - jsonify: jsonify is a Flask function that converts Python dictionaries to JSON responses.
    - login_required: login_required is a decorator from flask_login that restricts access to authenticated users.
    - User, Booking: These are models from the 'app.models' module representing users and bookings in the system.
    - BookingForm: BookingForm is a form class from the 'app.forms' module used for creating bookings.
    - db: db is an instance of the SQLAlchemy database used for database operations.

This module provides routes for retrieving user information and managing bookings. Users can be queried individually by their IDs, and a list of all users can be retrieved. Additionally, there is a commented-out route for creating bookings for users.
"""

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

# @user_routes.route('/<int:user_id>/bookings', methods=['POST'])
# # @login_required
# def create_bookings(user_id):
#     user_booking = User.query.get(user_id)
#     # print('user', user_booking)

#     form = BookingForm()
#     # print('FORM', form)

#     if form.validate_on_submit():
#         booking = Booking(
#             name = form.name.data,
#             type = form.type.data,
#             user = user_booking,
#             image_url = form.image_url.data,
#             color = form.color.data,
#             weight = form.weight.data,
#             birthday = form.birthday.data,
#             # user_id = user_id
#         )

#         db.session.add(booking)
#         db.session.commit()

#     return jsonify({'message': 'Booking created successfully'})
