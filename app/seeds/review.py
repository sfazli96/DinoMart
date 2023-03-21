from app.models import db, Review, environment, SCHEMA, User
from sqlalchemy.sql import text
import datetime

def seed_reviews():
    reviews = [
        Review(
            user_id=1, review='Amazing product 10/10 would buy again', product_id = 1, rating=5,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=2, review='THE GOOD', product_id = 2, rating=3,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=3, review='THE BAD 1', product_id = 2,rating=1,
            created_at=datetime.datetime.now()
        ),
       Review(
            user_id=1, review='GREAT PRODUCT 10/10 would buy again', product_id = 3, rating=5,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=2, review='THE GOOD', product_id = 3, rating=4,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=3, review='Terrible product, dont buy it', product_id = 3, rating=1,
            created_at=datetime.datetime.now()
        ),
    ]

    for review in reviews:
        db.session.add(review)

    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
