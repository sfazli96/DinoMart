from app.models import db, User, environment, SCHEMA, Booking
from sqlalchemy.sql import text
from datetime import datetime
from random import choice


def seed_booking():
    # from app.models import User
    demo = User.query.filter_by(username='Demo').first()
    marnie = User.query.filter_by(username='marnie').first()
    bobbie = User.query.filter_by(username='bobbie').first()

    booking1 = Booking(name='Jurassic World', type='Stegosaurus', user=demo,
                    image_url='https://static.wikia.nocookie.net/jurassicworld-evolution/images/1/1b/Stegosaurus_JWE2_Profile.png/revision/latest?cb=20220613214856', color='brown',
                    weight=1000, birthday=datetime(2010, 1, 1))
    booking2 = Booking(name='Jungle', type='tyrannosaurus-rex', user=marnie,
                    image_url='https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2021-04/210415-tyrannosaurus-rex-mn-1550-9612a9.jpg', color='white',
                    weight=1000, birthday=datetime(2015, 1, 1))
    booking3 = Booking(name='Rex', type='grooming', user=bobbie,
                    image_url='https://i.pinimg.com/originals/00/03/c2/0003c218255c12a03b8b68ef583698cb.jpg', color='black',
                    weight=950, birthday=datetime(2012, 1, 1))
    db.session.add_all([booking1, booking2, booking3])
    db.session.commit()


def undo_booking():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bookings RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM bookings"))

    db.session.commit()
