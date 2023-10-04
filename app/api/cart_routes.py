"""
Cart Routing Module

Routes:
    - '/<int:id>' (GET): Retrieve and return the contents of a 
    user's shopping cart.
    - '/' (POST): Create a new shopping cart for the currently 
    logged-in user.
    - '/' (PUT): Edit the quantity of a product in the user's 
    shopping cart or add a new product to the cart.
    - '/<int:id>' (DELETE): Delete a specific item from a user's 
    shopping cart.
    - '/<int:cart_id>/product/<int:product_id>' (POST): Add a 
    product to a user's shopping cart.
    - '/emptycart' (PUT): Clear all items from a user's shopping cart.

Dependencies:
    - Flask: Flask is a micro web framework used for building 
    web applications. It is used here to define and handle routes.
    - Blueprint: Blueprint is a Flask feature that allows 
    organizing routes and views into reusable components.
    - jsonify: jsonify is a Flask function that converts Python 
    dictionaries to JSON responses.
    - request: request is a Flask object that represents the 
    current HTTP request.
    - app.models: This module contains database models used 
    in the application, including User, Cart, and Product.
    - SQLAlchemy: SQLAlchemy is used to interact with the 
    database and perform queries.
    - flask_login: flask_login is used for managing user authentication and login sessions.

Each route corresponds to a specific function that performs actions related to 
managing shopping carts, such as reading, creating, editing, and clearing carts. 
These routes are protected by authentication (login_required) to ensure that 
only authenticated users can access them.

Please note that this module is part of a larger web application, and the 
routes and functions provided here are responsible for managing the shopping 
cart functionality within that application.
"""

from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload, session
from app.models import db, cartJoined, User, Cart, Product

cart_routes = Blueprint('cart', __name__)


@cart_routes.route('/<int:id>')
@login_required
def readCart(id):
    """
    Retrieve and return the contents of a user's shopping cart.

    Args:
        id (int): The user's ID.

    Returns:
        dict: A dictionary containing the user's shopping cart contents.
    """
    carts = db.session.query(Cart).filter(Cart.user_id == id).all()
    # print('carts', carts)
    cart_result = []
    for cart in carts:
        all_product = []
        for product in cart.products:
            # print('product', product.to_dict())
            productObj = product.to_dict()
            all_product.append(productObj)

        cart_object = cart.to_dict()
        # print('cart_obj', cart_object)
        cart_object.update({"products": all_product})
        cart_result.append(cart_object)

    result = {
        "cart": cart_result
    }
    # print('result',result)
    return result

@cart_routes.route('/', methods=['POST'])
def createCart():
    """
    Create a new shopping cart for the currently logged-in user.

    Returns:
        dict: A dictionary representation of the newly created shopping cart.
    """
    user = current_user
    # print('user', user)
    request_data = request.get_json()
    new_cart = Cart(
        user_id = user.id
    )
    db.session.add(new_cart)
    db.session.commit()

    return new_cart.to_dict()

@cart_routes.route('/', methods=["PUT"])
@login_required
def editCart():
    """
    Edit the quantity of a product in the user's shopping cart or add a new product to the cart.

    Returns:
        list: A list of dictionaries representing the updated shopping carts.
    """
    request_data = request.get_json()
    # print('request_data', request_data)
    product = Product.query.get(request_data["product_id"])
    # print('PRODUCT!!', product)
    product_quantity = request_data["quantity"]
    # print('PRODUCT_QUANTITY-----', product_quantity)
    user_id = request_data["user_id"]
    # carts = db.session.query(Cart).filter(Cart.id == id, Cart.user_id == request_data["user_id"]).options(joinedload(Cart.products)).all()
    carts = Cart.query.filter(Cart.user_id == user_id).options(joinedload(Cart.products)).all()

    # carts = db.session.query(Cart).filter(Cart.user_id == request_data["user_id"]).options(joinedload(Cart.products))
    # print('CARTS!!!!', carts)

    # final_result = []
    if not carts:
        return "no carts are found for this user", 404

    for cart in carts:
        for cart_prod in cart.products:
            if cart_prod.id == product.id:
                # print('PRODUCT QUANTITY------', product_quantity)
                cart_prod.quantity = product_quantity
                break
        else:
            cart.products.append(product)
            cart_prod = cart.products[-1]
            cart_prod.quantity = product_quantity
            db.session.commit()

    final_result = [cart.to_dict() for cart in carts]
    return final_result

@cart_routes.route('<int:id>', methods=['DELETE'])
def deleteCartItem(id):
    """
    Delete a specific item from a user's shopping cart.

    Args:
        id (int): The ID of the cart to remove the item from.

    Returns:
        jsonify: A JSON response confirming the deletion.
    """
    request_data = request.get_json()
    # print('request------', request_data)
    cart = Cart.query.get(id)
    # print('cart', cart)
    # print('cart', cart.to_dict())
    # print('product', cart.products)
    if not cart:
        return cart.errors

    # cart.products = [product for product in cart.products if product.id != request_data]
    # print('list-----cart', cart.products)

    for product in cart.products:
        if product.id == request_data["product_id"]:
            cart.products.remove(product)

    db.session.commit()
    # print('cart loop deletion', cart.products)
    # cart_obj = {
    #     'id': cart.id,
    #     'product': [product.to_dict() for product in cart.products],
    #     'user_id': cart.user_id
    # }
    cart_obj = cart.to_dict()
    cart_obj['products'] = []
    for product in cart.products:
        if product.id == request_data:
            continue
        product_obj = product.to_dict()
        # print('prod_obj', product_obj)
        cart_obj['products'].append(product_obj)

    return jsonify(cart_obj)

@cart_routes.route('/<int:cart_id>/product/<int:product_id>', methods=['POST'])
def addItemToCart(cart_id, product_id):
    """
    Add a product to a user's shopping cart.

    Args:
        cart_id (int): The ID of the cart to add the product to.
        product_id (int): The ID of the product to add to the cart.

    Returns:
        dict: A dictionary representation of the updated shopping cart.
    """
    # print('cartid', cart_id)
    # print('product_id', product_id)
    product = Product.query.get(product_id)
    cart = Cart.query.get(cart_id)
    # print('cart', cart)
    if not cart:
        return {"error": "Cart not found"}, 404

    # product = Product.query.get(body_data['product_id'])
    if not product:
        return {"error": "Product not found"}, 404
    # for item in cart.products:
    #     if item.id == product.id:
    #         return {"error": "Item is already in cart"}, 400

    cart.products.append(product)
    prod_obj = [product.to_dict() for product in cart.products]
    # print('products', product)
    db.session.commit()
    cart_obj = cart.to_dict()
    cart_obj["products"] = prod_obj
    return {"cart": cart_obj}
    # return {"success": "Product added to cart"}

@cart_routes.route('/emptycart', methods=['PUT'])
@login_required
def clearCart():
    """
    Clear all items from a user's shopping cart.

    Returns:
        dict: A confirmation that the cart has been cleared.
    """
    user_id = current_user.id
    cart_id = request.get_json()
    # print('cart_id', cart_id)
    # print("BODY_DATA", user_id)
    carts = Cart.query.filter(Cart.id == cart_id).all()
    for cart in carts:
        cart.products.clear()
        db.session.commit()

    return {"Cart Cleared": user_id}
