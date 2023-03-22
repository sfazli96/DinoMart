from flask import Blueprint, jsonify, request
import datetime
from app.models import Product
from flask_login import login_required, current_user

product_routes = Blueprint('products', __name__)


@product_routes.route('/')
def allProducts():
    products = Product.query.all()
    # print(products, 'QUERY')
    allProducts = []
    for product in products:
        pd = product.to_dict()
        # print(pd, 'PD')
        allProducts.append(pd)
    return {'products': allProducts}


@product_routes.route('/<int:id>')
def singleProduct(id):
    product = Product.query.get(id)
    print('PRODUCT', product)
    if not product:
        return {'error': ['Product has not been found']}, 404
    return product.to_dict()


