from app.models import db, environment, SCHEMA, Favorite
from sqlalchemy.sql import text
import datetime

def seed_favorites():
    favorite1 = Favorite(user_id=1, product_id=1, created_at=datetime.datetime.now())
    favorite2 = Favorite(user_id=1, product_id=2, created_at=datetime.datetime.now())
    favorite3 = Favorite(user_id=2, product_id=1, created_at=datetime.datetime.now())
    favorite4 = Favorite(user_id=3, product_id=3, created_at=datetime.datetime.now())

    db.session.add(favorite1)
    db.session.add(favorite2)
    db.session.add(favorite3)
    db.session.add(favorite4)
    db.session.commit()


def undo_favorites():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorite RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favorite"))

    db.session.commit()
