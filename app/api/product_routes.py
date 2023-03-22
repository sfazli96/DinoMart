from flask import Blueprint, jsonify, request
import datetime
from app.models import Product, Review
from flask_login import login_required, current_user

product_routes = Blueprint('products', __name__)


@product_routes.route('/')
def allProducts():
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
    prehistoric_product = Product.query.get(id)
    # print('PRODUCT', prehistoric_product)
    pd_dict = prehistoric_product.to_dict()
    print('pd_dict', pd_dict)
    pdReviews = {'reviews': [reviews.to_dict() for reviews in prehistoric_product.reviews]}
    pd_dict.update(pdReviews)

    return pd_dict
    # if not product:
    #     return {'error': ['Product has not been found']}, 404
    # return product.to_dict()
