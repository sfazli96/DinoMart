from flask import Blueprint, jsonify, request
from app.models import Review, db, Product
from app.forms import ReviewForm
import datetime
from flask_login import current_user, login_required
review_routes = Blueprint('reviews', __name__)

@review_routes.route('/')
def allReviews():
    reviews = Review.query.all()
    print('review', reviews)
    list = []
    for review in reviews:
        print(review.to_dict())
        list.append(review.to_dict())
    return {'reviews': list}


@review_routes.route('/', methods=['POST'])
@login_required
def createReview():
    date = datetime.datetime.now()
    jsonData = request.get_json()
    form = ReviewForm()
    # print('FORM', form)
    # print(current_user.id, 'current')
    form['csrf_token'].data = request.cookies['csrf_token'] # makes a csrf_token in form object

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
        return {"message": "Bad information, Please try again"}, 400

@login_required
@review_routes.route('/<int:id>', methods=['PUT'])
def updateReview(id):
    date = datetime.datetime.now()
    jsonData = request.get_json()
    form = ReviewForm()
    review = Review.query.filter_by(id=id).first()
    print('review', review)
    if review is None:
        return "Review not found", 404

    if form.validate_on_submit():
        review.review = jsonData["review"]
        review.rating = jsonData["rating"]
        review.product_id = jsonData["product_id"]
        review.user_id = jsonData["user_id"]
        review.created_at = date

        db.session.commit()

        return review.to_dict()
    else:
        return "Bad data, please try again", 404
