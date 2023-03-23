from flask import Blueprint, jsonify, request
from app.models import db, cartJoined, User, Cart
from sqlalchemy.orm import joinedload, session
from flask_login import login_required, current_user

cart_routes = Blueprint('cart', __name__)

@cart_routes.route('/<int:id>')
# @login_required
def readCart(id):
    carts = db.session.query(Cart).filter(Cart.user_id == id).all()
    # print('carts', carts)
    cart_result = []
    for cart in carts:
        allProducts = []
        for product in cart.products:
            # print('product', product.to_dict())
            productObj = product.to_dict()
        allProducts.append(productObj)

    cart_object = cart.to_dict()
    # print('cart_obj', cart_object)
    cart_object.update({"products": allProducts})
    cart_result.append(cart_object)

    result = {
        "products": cart_result
    }
    # print('result',result)
    return result


@cart_routes.route('/', methods=['POST'])
def createCart():
    user = current_user
    print('user', user)
    body_info = request.get_json()
    new_cart = Cart(
        user_id = user.id
    )
    db.session.add(new_cart)
    db.session.commit()

    return new_cart.to_dict()


# @cart_routes.route('/', methods=["PUT"])
# def editCart():







@cart_routes.route('<int:id>', methods=['DELETE'])
def deleteCartItem(id):
    body_info = request.get_json()
    cart = Cart.query.get(id)
    print('cart', cart)
    if not cart:
        return cart.errors

    for product in cart.products:
        if product.id == body_info:
            cart.product.remove(product)

    db.session.commit()

    cart_obj = cart.to_dict()
    cart_obj['products'] = []
    for product in cart.products:
        if product.id == body_info:
            continue
        product_obj = product.to_dict()
        print('prod_ojb', product_obj)
        cart_obj['products'].append(product_obj)

    return cart_obj
