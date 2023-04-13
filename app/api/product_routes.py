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
