from flask import Blueprint, jsonify, request
import datetime
from app.models import Product, Review, db
from flask_login import login_required, current_user
from app.forms import ReviewForm

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


@product_routes.route('/<int:id>/reviews', methods=['POST'])
@login_required
def createReview(id):
    date = datetime.datetime.now()
    jsonData = request.get_json()
    form = ReviewForm()
    # print('FORM', form)
    # print(current_user.id, 'current')
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_review = Review(
            review = jsonData["review"],
            rating = jsonData["rating"],
            product_id = jsonData["product_id"],
            user_id = current_user.id,
            created_at=date
        )
        print(new_review.to_dict())
        db.session.add(new_review)
        db.session.commit()

        return new_review.to_dict()
    else:
        # return form.errors
        return {"message": "Bad information, Please try again"}, 404


