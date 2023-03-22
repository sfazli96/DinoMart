from flask import Blueprint, jsonify, request
from app.models import Review, db, Product
from app.forms import ReviewForm
import datetime
from flask_login import login_required, current_user
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
# @login_required
def createReview():
    date = datetime.datetime.now()
    jsonData = request.get_json()
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token'] # makes a csrf_token in form object

    if form.validate_on_submit():
        recent_review = Review.query.filter_by(product_id=jsonData["product_id"], user_id=current_user.id).first()
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
        return {"message": "Bad information, Please try again"}, 400
