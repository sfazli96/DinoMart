from flask import Blueprint, jsonify, request
from app.models import Review, db, Product
# from app.forms import ReviewForm
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

