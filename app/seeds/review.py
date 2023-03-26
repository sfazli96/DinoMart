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
            user_id=2, review='This was awesome, would buy again', product_id = 1, rating=4,
            created_at=datetime.datetime.now()
        ),
         Review(
            user_id=3, review='This was not good, would not recommend', product_id = 1, rating=2,
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
            user_id=1, review='Amazing, 10/10 would buy again', product_id = 2, rating=5,
            created_at=datetime.datetime.now()
        ),
       Review(
            user_id=1, review='This was a good creature, I would buy it again', product_id = 3, rating=5,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=2, review='This product was pretty good', product_id = 3, rating=4,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=3, review='horrible product/creature, do not buy it please', product_id = 3, rating=1,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=2, review='This was a pretty cool product or creature', product_id = 4, rating=4,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=1, review='Its not that good.', product_id = 5, rating=2,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=3, review='This was not that good', product_id = 4,rating=2,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=2, review='This was a pretty cool product or creature', product_id = 7, rating=4,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=1, review='Its not that good.', product_id = 6, rating=2,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=3, review='This was not that good', product_id = 6,rating=2,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=3, review='horrible product, do not buy it please', product_id = 10, rating=1,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=2, review='This was a pretty cool product', product_id = 8, rating=4,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=1, review='Its not that good.', product_id = 8, rating=2,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=3, review='This was not that good', product_id = 7,rating=2,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=3, review='horrible product, do not buy it please', product_id = 9, rating=1,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=2, review='This was a pretty cool product', product_id = 9, rating=4,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=1, review='Its not that good.', product_id = 11, rating=2,
            created_at=datetime.datetime.now()
        ),
        Review(
            user_id=3, review='This was not that good', product_id = 10,rating=2,
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
