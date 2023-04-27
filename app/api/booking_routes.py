from flask import Blueprint, jsonify, request
from app.models import Booking, User, db
from flask_login import login_required, current_user
from app.forms import BookingForm
from datetime import datetime
from .AWS_helpers import (
    upload_file_to_s3, get_unique_filename)
from flask import jsonify

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


# @booking_routes.route('/user/<int:user_id>/bookings', methods=['POST'])
# @login_required
# def create_booking(user_id):
#     if current_user.id == user_id:
#         booking_data = request.get_json()
#         # print('booking---------', booking_data)
#         birthday = datetime.strptime(booking_data['birthday'], '%Y-%m-%d')
#         booking = Booking(
#             name=booking_data['name'],
#             type=booking_data['type'],
#             user_id=user_id,
#             image_url=booking_data['image_url'],
#             color=booking_data['color'],
#             weight=booking_data['weight'],
#             birthday=birthday
#         )
#         db.session.add(booking)
#         db.session.commit()

#         return booking.to_dict()
#     else:
#         return {"message": "Bad information, Please try again"}

@booking_routes.route('/user/<int:user_id>/bookings', methods=['POST'])
@login_required
def create_booking(user_id):
    data = request.files
    # print('data', data.get('name'))
    form = BookingForm(
        name = data.get('name'),
        type = data.get('type'),
        image_url = data.get('image_url'),
        color = data.get('color'),
        weight = data.get('weight'),
        birthday = data.get('birthday')
    )
    # print('FORM', form)
    # print('FORMDATA', form.data)
    # print(request, 'REQUEST')
    # print(request.files, 'request-files')
    # print('request', request.files.get('image_url'))
    form['csrf_token'].data = request.cookies['csrf_token']
    # print('form----', form.data['image_url'])
    if form.validate_on_submit():
        image = form.data.get('image_url')
        image.filename = get_unique_filename(image.filename)
        print('image', image)
        upload = upload_file_to_s3(image)
        print('upload', upload)
        if "url" not in upload:
            return jsonify({"message": "There was a problem uploading the image file."}), 500

        url = upload["url"]
        new_booking = Booking(image_url=url, name=form.name.data, type=form.type.data, color=form.color.data, weight=form.weight.data, birthday=form.birthday.data, user_id = user_id)
        db.session.add(new_booking)
        db.session.commit()

        return jsonify({"booking": new_booking.to_dict()}), 201

    errors = {field.name: field.errors for field in form if field.errors}
    return jsonify({"errors": errors}), 400



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

    return booking.to_dict()
