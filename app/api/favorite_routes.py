"""
Favorite Routes Module

This module defines routes and functions related to managing user favorites using Flask.

Routes:
    - '/' (POST): Create a new favorite for a user.
    - '/<int:user_id>' (GET): Retrieve a user's favorite products.
    - '/<int:id>' (DELETE): Delete a favorite product by its ID.

Dependencies:
    - Flask: Flask is a micro web framework used for building web applications. It is used here to define and handle routes.
    - Blueprint: Blueprint is a Flask feature that allows organizing routes and views into reusable components.
    - jsonify: jsonify is a Flask function that converts Python dictionaries to JSON responses.
    - request: request is a Flask object that represents the current HTTP request.
    - app.models: This module contains database models used in the application, including User, Favorite, and Product.
    - flask_login: flask_login is used for managing user authentication and login sessions.
    - datetime: The datetime module is used to capture the current date and time when creating a new favorite.

Each route corresponds to a specific function that performs actions related to managing user favorites. The routes allow users to create new favorites, retrieve their favorite products, and delete specific favorites by their IDs.

Please note that this module is part of a larger web application, and the routes and functions provided here are responsible for managing the favorite products functionality within that application.
"""

from flask import Blueprint, jsonify, request
from app.models import Favorite, User, db
from flask_login import login_required, current_user
from datetime import datetime

favorite_routes = Blueprint('favorites', __name__)


@favorite_routes.route('/', methods = ['POST'])
def create_favorites():
    """
    Create a new favorite product for a user.

    Args:
        None

    Returns:
        dict: A dictionary representation of the newly created favorite product.
    """
    created_at = datetime.now()
    request_data = request.get_json()

    favorite = Favorite(
        user_id = request_data["user_id"],
        product_id = request_data["product_id"],
        created_at = created_at
    )
    # print('FAV-----------------------', favorite)
    db.session.add(favorite)
    db.session.commit()

    return favorite.to_dict()

@favorite_routes.route('/<int:user_id>', methods=['GET'])
def get_favorites(user_id):
    """
    Retrieve the favorite products of a specific user.

    Args:
        user_id (int): The ID of the user whose favorite products are to be retrieved.

    Returns:
        jsonify: A JSON response containing a list of dictionaries representing the user's favorite products.
    """
    favorites = Favorite.query.filter_by(user_id = user_id).all()
    # print('FAV---------', favorites)
    fav_dict = [favorite.to_dict() for favorite in favorites]
    # print('DICT----------', fav_dict)
    return jsonify(fav_dict)

@favorite_routes.route('/<int:id>', methods=['DELETE'])
def delete_favorite(id):
    """
    Delete a favorite product by its ID.

    Args:
        id (int): The ID of the favorite product to be deleted.

    Returns:
        dict: A dictionary representation of the deleted favorite product, or a JSON error response if the favorite product was not found.
    """
    favorite = Favorite.query.filter_by(product_id = id).first()
    # favorite = Favorite.query.get(id)
    # print('FAVOR', favorite.to_dict())
    if favorite:
        db.session.delete(favorite)
        db.session.commit()
        return favorite.to_dict()
    else:
        return {"error": "Favorite not found"}, 404
