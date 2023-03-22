from app.models import db, Review, environment, SCHEMA, User
from sqlalchemy.sql import text
import datetime

def seed_reviews():
    reviews = [
        Review(
            user_id=1, review='Amazing, 10/10 would buy again', product_id = 1, rating=5,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=2, review='Its pretty good, not bad.', product_id = 2, rating=3,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=3, review='This was not that good', product_id = 2,rating=1,
            created_at=datetime.datetime.now()
        ),
       Review(
            user_id=1, review='This was a good product, I would buy it again', product_id = 3, rating=5,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=2, review='This product was pretty good', product_id = 3, rating=4,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=3, review='horrible product, do not buy it please', product_id = 3, rating=1,
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
