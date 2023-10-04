"""
This module defines routes and functions related to product management and reviews using Flask.

Routes:
    - '/' (GET): Retrieve a list of all products along with their details.
    - '/<int:id>' (GET): Retrieve details of a single product by its ID, including associated reviews and favorites.
    - '/<int:id>/reviews' (POST): Create a new review for a product by its ID.

Dependencies:
    - Flask: Flask is a micro web framework used for building web applications. It is used here to define and handle routes.
    - Blueprint: Blueprint is a Flask feature that allows organizing routes and views into reusable components.
    - jsonify: jsonify is a Flask function that converts Python dictionaries to JSON responses.
    - datetime: The datetime module is used to capture the current date and time when creating a review.
    - Product, Review: These are models from the 'app.models' module representing products and reviews in the system.
    - ReviewForm: ReviewForm is a form class from the 'app.forms' module used for creating reviews.
    - db: db is an instance of the SQLAlchemy database used for database operations.
    - login_required: login_required is a decorator from flask_login that restricts access to authenticated users.
    - current_user: current_user is a variable from flask_login that represents the currently logged-in user.

This module provides routes for retrieving product information, creating new reviews for products, and displaying detailed product information including reviews and favorites.
"""

from flask import Blueprint, jsonify, request
import datetime
from app.models import Product, Review, db
from flask_login import login_required, current_user
from app.forms import ReviewForm

product_routes = Blueprint('products', __name__)


@product_routes.route('/')
def allProducts():
    """
    Retrieve a list of all products.

    Args:
        None

    Returns:
        dict: A dictionary containing a list of all products with their details.
    """
    prehistoric_products = Product.query.all()
    # print(products, 'QUERY')
    allProducts = []
    for product in prehistoric_products:
        pd = product.to_dict()
        # print(pd, 'PD')
        allProducts.append(pd)
    return {'products': allProducts}

@product_routes.route('/<int:id>')
def singleProduct(id):
    """
    Retrieve details of a single product by its ID.

    Args:
        id (int): The ID of the product to be retrieved.

    Returns:
        dict: A dictionary containing details of the specified product, including reviews and favorites.
    """
    prehistoric_product = Product.query.get(id)
    # print('PRODUCT', prehistoric_product)
    pd_dict = prehistoric_product.to_dict()
    # print('pd_dict', pd_dict)
    pdReviews = {'reviews': [reviews.to_dict() for reviews in prehistoric_product.reviews]}
    pdFavorites = {'favorites': [favorites.to_dict() for favorites in prehistoric_product.favorites]}
    pd_dict.update(pdReviews)
    pd_dict.update(pdFavorites)

    return pd_dict
    # if not product:
    #     return {'error': ['Product has not been found']}, 404
    # return product.to_dict()

@product_routes.route('/<int:id>/reviews', methods=['POST'])
@login_required
def createReview(id):
    """
    Create a new review for a product by its ID.

    Args:
        id (int): The ID of the product for which the review is being created.

    Returns:
        dict: A dictionary representing the newly created review, or a JSON error response if the review creation fails.
    """
    date = datetime.datetime.now()
    request_data = request.get_json()
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if current_user is not None and form.validate_on_submit():
        new_review = Review(
            review = request_data["review"],
            rating = request_data["rating"],
            product_id = request_data["product_id"],
            user_id = current_user.id,
            created_at=date
        )
        db.session.add(new_review)
        db.session.commit()

        return new_review.to_dict()
    else:
        return {"message": "Bad information, Please try again"}, 404
