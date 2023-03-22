from app.models import db, User, environment, SCHEMA, Booking
from sqlalchemy.sql import text
from datetime import datetime
from random import choice


def seed_booking():
    from app.models import User
    demo = User.query.filter_by(username='Demo').first()
    marnie = User.query.filter_by(username='marnie').first()
    bobbie = User.query.filter_by(username='bobbie').first()

    booking1 = Booking(name='appointment1', type='grooming', user=demo,
                    image_url='https://example.com/image1.jpg', color='brown',
                    weight=100, birthday=datetime(2010, 1, 1))
    booking2 = Booking(name='appointment2', type='bath', user=marnie,
                    image_url='https://example.com/image2.jpg', color='white',
                    weight=200, birthday=datetime(2015, 1, 1))
    booking3 = Booking(name='appointment3', type='grooming', user=bobbie,
                    image_url='https://example.com/image3.jpg', color='black',
                    weight=150, birthday=datetime(2012, 1, 1))
    db.session.add_all([booking1, booking2, booking3])
    db.session.commit()


def undo_booking():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.booking RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM booking"))

    db.session.commit()
