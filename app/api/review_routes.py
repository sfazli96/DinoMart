"""
This module defines routes and functions related to managing reviews and user interactions with reviews using Flask.

Routes:
    - '/' (GET): Retrieve a list of all reviews, including the usernames of the reviewers.
    - '/' (POST): Create a new review for a product.
    - '/<int:id>' (PUT): Update an existing review by its ID.
    - '/<int:id>' (DELETE): Delete a review by its ID.

Dependencies:
    - Flask: Flask is a micro web framework used for building web applications. It is used here to define and handle routes.
    - Blueprint: Blueprint is a Flask feature that allows organizing routes and views into reusable components.
    - jsonify: jsonify is a Flask function that converts Python dictionaries to JSON responses.
    - Review, User, Product: These are models from the 'app.models' module representing reviews, users, and products in the system.
    - ReviewForm: ReviewForm is a form class from the 'app.forms' module used for creating and updating reviews.
    - datetime: The datetime module is used to capture the current date and time when creating or updating a review.
    - db: db is an instance of the SQLAlchemy database used for database operations.
    - login_required: login_required is a decorator from flask_login that restricts access to authenticated users.
    - current_user: current_user is a variable from flask_login that represents the currently logged-in user.

This module provides routes for retrieving reviews, creating new reviews, updating existing reviews, and deleting reviews. It also includes functionality to associate reviews with the usernames of the reviewers.
"""

from flask import Blueprint, jsonify, request
from app.models import Review, db, Product, User
from app.forms import ReviewForm
import datetime
from flask_login import current_user, login_required, current_user

review_routes = Blueprint('reviews', __name__)


@review_routes.route('/')
def allReviews():
    """
    Retrieve a list of all reviews, along with the usernames of the reviewers.

    Args:
        None

    Returns:
        dict: A dictionary containing a list of all reviews with reviewer usernames.
    """
    reviews = Review.query.all()
    users = User.query.all()
    user_dict = {user.id: user.username for user in users}
    review_list = []
    for review in reviews:
        review_dict = review.to_dict()
        user_id = review_dict['user_id']
        review_dict['username'] = user_dict.get(user_id)
        review_list.append(review_dict)
    return {'reviews': review_list}

@review_routes.route('/', methods=['POST'])
@login_required
def createReview():
    """
    Create a new review for a product.

    Args:
        None

    Returns:
        dict: A dictionary representing the newly created review, or a JSON error response if the review creation fails.
    """

    date = datetime.datetime.now()
    request_data = request.get_json()
    form = ReviewForm()
    # print('FORM', form)
    # print(current_user.id, 'current')
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_review = Review(
            review = request_data["review"],
            rating = request_data["rating"],
            product_id = request_data["product_id"],
            user_id = current_user.id,
            created_at=date
        )
        print(new_review.to_dict())
        db.session.add(new_review)
        db.session.commit()

        return new_review.to_dict()
    else:
        # return form.errors
        return {"message": "Bad information, Please try again"}, 400

@review_routes.route('/<int:id>', methods=['PUT'])
@login_required
def updateReview(id):
    """
    Update an existing review by its ID.

    Args:
        id (int): The ID of the review to be updated.

    Returns:
        dict: A dictionary representing the updated review, or a JSON error response if the update fails.
    """
    # review = Review.query.get(id)
    date = datetime.datetime.now()
    request_data = request.get_json()
    # print('request_data', request_data)
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # review = Review.query.filter_by(id=id).first()
    review = Review.query.filter_by(id=id).first()
    # review = Review.query.all()
    # print('review', review)
    # print('current------', current_user)
    # if review is None:
    #     return "Review not found", 404

    if current_user.id is not None:
        review.user_id = current_user.id
    else:
        return 'User Not logged in'

    if form.validate_on_submit():
        review.review = request_data["review"]
        review.rating = request_data["rating"]
        review.product_id = request_data["product_id"]
        # review.user_id = current_user.id
        review.created_at = date

        db.session.commit()

        return review.to_dict()
    else:
        return form.errors
        # return "Bad data, please try again", 404

@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def deleteReview(id):
    """
    Delete a review by its ID.

    Args:
        id (int): The ID of the review to be deleted.

    Returns:
        dict: A dictionary confirming the successful deletion of the review.
    """
    review = Review.query.get(id)

    db.session.delete(review)
    db.session.commit()

    return {"Review successfully Deleted": id}
