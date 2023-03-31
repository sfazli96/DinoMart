from flask import Blueprint, jsonify, request
from app.models import Review, db, Product, User
from app.forms import ReviewForm
import datetime
from flask_login import current_user, login_required, current_user
review_routes = Blueprint('reviews', __name__)

@review_routes.route('/')
def allReviews():
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
    review = Review.query.get(id)

    db.session.delete(review)
    db.session.commit()

    return {"Review successfully Deleted": id}
